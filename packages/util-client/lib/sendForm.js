'use strict'

const { get } = require('@the-/window')
const createFormData = require('./createFormData')

/**
 * Send form data
 * @memberof module:@the-/util-client
 * @function sendForm
 * @param {string} url - Form url
 * @param {Object} values
 * @param {Object} [options={}] - Optional settings
 */
async function sendForm(url, values, options = {}) {
  const fetch = get('fetch')
  const { method = 'post' } = options
  const body = createFormData(values)
  const response = await fetch(url, {
    body,
    method,
  })
  const type = response.headers.get('content-type')
  const isJSON = /json/.test(type)
  if (isJSON) {
    return response.json()
  } else {
    return response.text()
  }
}

module.exports = sendForm
