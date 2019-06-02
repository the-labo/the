/**
 * Create from data from object
 * @memberof module:@the-/util-client
 * @function createFormData
 * @param {Object} values - Form data object
 * @returns {FormData}
 */
'use strict'

const { get } = require('@the-/window')

/** @lends module:@the-/util-client.createFormData */
function createFormData(values) {
  const FormData = get('FormData')
  const form = new FormData()
  for (const [k, v] of Object.entries(values)) {
    form.append(k, v)
  }
  return form
}

module.exports = createFormData
