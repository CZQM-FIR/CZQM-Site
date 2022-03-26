const router = require('express').Router();
const axios = require('axios');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

router.post('/:code', async (req, res) => {
    const { code } = req.params;

    const result = await axios.post(`https://auth-dev.vatsim.net/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/auth',
        code
    })

    const vatsimUser = await axios.get(`https://auth-dev.vatsim.net/api/user`, {
        headers: {
            'Authorization': `Bearer ${result.data.access_token}`,
            'Accept': 'application/json'
        }
    })

    const { cid, personal, vatsim, oauth } = vatsimUser.data.data;

    const user = await User.findOneAndUpdate(
        { cid },
        {
            cid,
            access_token: result.data.access_token,
            refresh_token: result.data.refresh_token,
            expire: result.data.expires_in + Date.now(),
            personal,
            vatsim,
        },
        {
            new: true,
            upsert: true,
        })

    const token = jwt.sign(
        {
            cid,
            name: personal.name_full
        },
        process.env.CLIENT_SECRET,
        {
            expiresIn: result.data.expires_in,

        }
    );

    user.jwt = token;
    user.save()

    res
        .cookie('jwt', token)
        .status(200)
        .json({
            message: 'Login Successful',
        })

    // use jwt to fetch user data
    // save jwt as cookie
    // if jwt is invalid, run logout and direct to login page

    // TODO: Build out logout logic

    // invalidate jwt
    // clear cookie
    // redirect to main page

    // TODO: Build user management page
    // list of all users

    // set perms
    // solos
    //t

    // console.log(vatsimUser.data.data.cid);
})

module.exports = router;