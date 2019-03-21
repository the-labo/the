/**
 * Convert style into style string
 * @function styleString
 * @param {string} selector - Selector string
 * @param {Object} style - Style string
 * @param {string} [atRule=null]
 * @returns {Object} Style object
 */
'use strict'

const nanoCSS = require('nano-css')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: prefixer } = require('nano-css/addon/prefixer')
const { addon: unitless } = require('nano-css/addon/unitless')
const { EOL } = require('os')

/** @lends styleString */
function styleString(selector, style, atRule = null) {
  if (/^@/.test(selector)) {
    const converted = Object.entries(style)
      .map(([s, sl]) => styleString(s, sl))
      .join(' ')
    return `${selector} { ${converted}}`
  }
  const nano = nanoCSS.create({ client: false })
  unitless(nano)
  prefixer(nano)
  keyframes(nano)
  nano.put(selector, style, atRule)
  return String(nano.raw)
}

styleString.fromStyles = (styles) => {
  return Object.keys(styles)
    .map((selector) => styleString(selector, styles[selector]))
    .filter(Boolean)
    .join(EOL)
}

module.exports = styleString
