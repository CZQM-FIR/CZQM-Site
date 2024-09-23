const { createTransport } = require('nodemailer')
const { transporterConfig } = require('../config')

const transporter = createTransport(transporterConfig)

const emailHTML = (message) => `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</head>
<body class="bg-primary">
  <div class="py-5">
      <img
        src="https://api.czqm.ca/files/branding/white/czqm-white.png"
        alt="CZQM Logo"
        style="
          max-width: 10rem;
          margin-left: auto;
          margin-right: auto;
          display: block;
        "
        class="pb-3"
      />
      <div
        class="bg-white p-5 my-3 container"
        style="
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          border-radius: 5px;
          max-width: 40rem;
          margin: auto;
        "
      >
        <h3>Hello!</h3>
        <p>${message}</p>
        <hr />
        <p class="text-muted text-center" style="font-size: small">
          This email was sent automaticaly by CZQM Web Services in accordance
          with our <a class="text-muted" href="https://api.czqm.ca/files/docs/privacy-policy.pdf">privacy policy</a>.
        </p>
        </p>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>
</html>`

const sendEmail = async (to, subject, message, replyTo = '', from = `"CZQM Web Services" <${transporterConfig.auth.user}>`) => {
  // try {
  //   await transporter.sendMail({
  //     from,
  //     to,
  //     subject,
  //     replyTo,
  //     html: emailHTML(message)
  //   })
  // } catch (error) {
  //   console.error(error)
  // }
  console.log(`Attempting to send email to ${to} but email is dissabled`)
}

/**
 * Send the same email to multiple recipients
 * @param {array} emails Array of emails to send the broadcast to
 * @param {string} subject Subject of the email
 * @param {string} message Message to send in html format
 * @param {array} attachments Array of attachments in attachment format
 */
const sendEmailToAll = async (emails, subject, message, replyTo = '') => {
  emails.forEach(async (email) => {
    await sendEmail(email, subject, message, replyTo)
    if (process.env.NODE_ENV !== 'production') console.info(`[DEBUG] Email sent to ${email}`)
  })
}

module.exports = {
  sendEmail,
  sendEmailToAll
}
