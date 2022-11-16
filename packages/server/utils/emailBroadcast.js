const { createTransport } = require('nodemailer')
const { transporterConfig } = require('../config')

/**
 * Send an email to a single recipient
 * @param {string} email Email to send the email to
 * @param {string} subject Subject of the email
 * @param {strign} message Message to send in html format
 */
const sendEmail = async (email, subject, message) => {
    const transporter = createTransport(transporterConfig)

    await transporter.sendMail({
        from: `"CZQM Web Services" <${transporterConfig.auth.user}>`,
        to: email,
        subject,
        html: message,
    })
}

/**
 * Send the same email to multiple recipients
 * @param {array} emails Array of emails to send the broadcast to
 * @param {string} subject Subject of the email
 * @param {string} message Message to send in html format
 */
const sendEmailToAll = async (emails, subject, message) => {
    const promises = emails.map(email => sendEmail(email, subject, message))
    await Promise.all(promises)
}

module.exports = {
    sendEmail,
    sendEmailToAll,
}