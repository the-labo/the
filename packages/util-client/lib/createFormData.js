'use strict'

const { get } = require('@the-/window')

/**
 * Create from data from object
 * @memberof module:@the-/util-client
 * @function createFormData
 * @param {Object} values - Form data object
 * @returns {FormData}
 */
function createFormData(values) {
  const FormData = get('FormData')
  const form = new FormData()
  for (const [k, v] of Object.entries(values)) {
    form.append(k, v)
  }
  return form
}

module.exports = createFormData
