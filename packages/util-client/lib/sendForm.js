/**
 * Send form data
 * @memberof module:@the-/util-client
 * @function sendForm
 * @param {string} url - Form url
 * @param {Object} values
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { get } = require('@the-/window')
const createFormData = require('./createFormData')

/** @lends module:@the-/util-client.sendForm */
async function sendForm(url, values, options = {}) {
  const fetch = get('fetch')
  const { method = 'post' } = options
  const body = createFormData(values)
  const response = await fetch(url, {
    body,
    method,
  })
  return response.json()
}

module.exports = sendForm
