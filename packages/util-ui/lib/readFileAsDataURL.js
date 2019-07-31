'use strict'

/**
 * Read file  : data url
 * @memberof module:@the-/util-ui
 * @deprecated
 * @function readFileAsDataURL
 * @param {File} - File to read
 * @returns {Promise<string>} Data url
 */
const { get } = require('bwindow')

/** @lends module:@the-/util-ui.readFileAsDataURL */
async function readFileAsDataURL(file) {
  const FileReader = get('FileReader')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = (err) => reject(err)
    reader.onload = (ev) => resolve(ev.target.result)
    reader.readAsDataURL(file)
  })
}

module.exports = readFileAsDataURL
