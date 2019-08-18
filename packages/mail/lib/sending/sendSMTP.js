'use strict'

const nodemailer = require('nodemailer')
const handleUnknownOptions = require('../helpers/handleUnknownOptions')

/**
 * @memberof module:@the-/mail.sending
 * @function sendSMTP
 * @returns {Promise<*>}
 */
async function sendSMTP({ content, from, subject, to, url, ...rest }) {
  handleUnknownOptions(rest)
  const transporter = nodemailer.createTransport(url)
  const data = {
    from,
    html: content,
    subject,
    to,
  }

  const result = await new Promise((resolve, reject) =>
    transporter.sendMail(data, (err, result) =>
      err ? reject(err) : resolve(result),
    ),
  )
  return result
}

module.exports = sendSMTP
