require('dotenv').config()

module.exports = {
  mongoUri: process.env.MONGO_URI,
  PORT: process.env.PORT || 3500,
  transporterConfig: {
    host: 'smtppro.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'webmaster@czqm.ca',
      pass: 'G4KBp5prVs2b'
    }
  }
}
