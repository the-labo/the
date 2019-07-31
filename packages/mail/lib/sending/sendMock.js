'use strict'

/**
 * @memberof module:@the-/mail.sending
 * @function sendMock
 */
const handleUnknownOptions = require('../helpers/handleUnknownOptions')

const BAR = '=========================='

/** @lends module:@the-/mail.sending.sendMock */
async function sendMock({ content, from, subject, to, ...rest }) {
  handleUnknownOptions(rest)
  console.log(BAR)
  console.log(`From: ${from}`)
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log('Content:')
  console.log('')
  console.log(content)
  console.log('')
  console.log(BAR)
}

module.exports = sendMock
