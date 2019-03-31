/**
 * Read file  : data url
 * @deprecated
 * @function readFileAsDataURL
 * @param {File} - File to read
 * @returns {Promise.<string>} Data url
 */
'use strict'

const { get } = require('bwindow')

/** @lends readFileAsDataURL */
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
