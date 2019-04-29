/**
 * @function sendSMTP
 */
'use strict'

const nodemailer = require('nodemailer')
const handleUnknownOptions = require('../helpers/handleUnknownOptions')

/** @lends sendSMTP */
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
