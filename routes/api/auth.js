const router = require('express').Router();
const axios = require('axios');

router.get('/:code', async (req, res) => {
    const { code } = req.params;

    await axios.post(`https://auth-dev.vatsim.net/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/auth',
        code
    }).then((result, err) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(result.data);
        }
    })
})

module.exports = router;