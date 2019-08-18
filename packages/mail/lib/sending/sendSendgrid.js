'use strict'

const handleUnknownOptions = require('../helpers/handleUnknownOptions')

/**
 * @memberof module:@the-/mail.sending
 * @function sendSendgrid
 * @returns {Promise<*>}
 */
async function sendSendgrid({ content, from, key, subject, to, ...rest }) {
  handleUnknownOptions(rest)
  if (!key) {
    throw new Error('key is required for send grid')
  }

  const sendgrid = require('@sendgrid/mail')

  sendgrid.setApiKey(key)
  const config = {
    from,
    html: content,
    subject,
    to,
  }
  return sendgrid.send(config)
}

module.exports = sendSendgrid
