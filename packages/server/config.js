require('dotenv').config()

module.exports = {
  mongoUri: process.env.MONGO_URI,
  PORT: process.env.PORT || 3500,
  transporterConfig: {
    host: 'smtp.migadu.com',
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@czqm.ca',
      pass: 'noreply'
    }
  }
}
