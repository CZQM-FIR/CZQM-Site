require('dotenv').config();

module.exports = {
    mongoUri: process.env.MONGO_URI,
    PORT: process.env.PORT || 80,
    transporterConfig: {
        host: 'smtppro.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jack@koskie.ca',
            pass: 'WuU5j4hYbLcA',
        },
    }
}