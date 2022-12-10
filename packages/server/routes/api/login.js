const router = require('express').Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

router.post('/:code', async (req, res) => {
    const { code } = req.params

    const result = await axios.post(`https://auth.vatsim.net/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://czqm.ca/auth',
        code,
    })

    const vatsimUser = await axios.get(`https://auth.vatsim.net/api/user`, {
        headers: {
            Authorization: `Bearer ${result.data.access_token}`,
            Accept: 'application/json',
        },
    })

    const { cid, personal, vatsim } = vatsimUser.data.data

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
        }
    )

    const token = jwt.sign(
        {
            cid,
            name: personal.name_full,
        },
        process.env.CLIENT_SECRET,
        {
            expiresIn: result.data.expires_in,
        }
    )

    user.jwt.push(token)
    user.save()

    res.cookie('jwt', token, {
        maxAge: Math.round(Date.now() / 1000) + result.data.expires_in,
    })
        .status(200)
        .json({
            message: 'Login Successful',
        })
})

module.exports = router
