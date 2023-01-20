const { createTransport } = require('nodemailer')
const md = require('markdown-it')({
    html: true,
    breaks: true,
})
const { transporterConfig } = require('../config')

/* 
* Attachment Format:
* {
*   filename: 'text1.txt',
*   path: '/path/to/file.txt'
*   cid: 'content identifier for using inline images'
* }
*/

/**
 * Send an email to a single recipient
 * @param {string} email Email to send the email to
 * @param {string} subject Subject of the email
 * @param {string} message Message to send in html format
 * @param {array} attachments Array of attachments in attachment format *Optional
 */
const sendEmail = async (email, subject, message, attachments = [], replyTo = '') => {
    const transporter = createTransport(transporterConfig)

    await transporter.sendMail({
        from: `"CZQM Web Services" <${transporterConfig.auth.user}>`,
        bcc: email,
        subject,
        html: md.render(message),
        attachments,
        replyTo
    })
}

/**
 * Send the same email to multiple recipients
 * @param {array} emails Array of emails to send the broadcast to
 * @param {string} subject Subject of the email
 * @param {string} message Message to send in html format
 * @param {array} attachments Array of attachments in attachment format
 */
const sendEmailToAll = async (emails, subject, message, attachments = [], replyTo = '') => {
    emails.forEach(async (email) => {
        await sendEmail(email, subject, message, attachments, replyTo)
        if (process.env.NODE_ENV === 'development') console.info(`[DEBUG] Email sent to ${email}`)
    })
}

module.exports = {
    sendEmail,
    sendEmailToAll,
}