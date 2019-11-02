'use strict'

const nanoCSS = require('nano-css')
const { addon: keyframes } = require('nano-css/addon/keyframes')
const { addon: prefixer } = require('nano-css/addon/prefixer')
const { addon: unitless } = require('nano-css/addon/unitless')

const EOL = '\n'

/**
 * Convert style into style string
 * @function styleString
 * @param {string} selector - Selector string
 * @param {Object} style - Style string
 * @param {string} [atRule=null]
 * @returns {Object} Style object
 */
function styleString(selector, style, atRule = null) {
  if (/^@/.test(selector)) {
    const converted = Object.entries(style)
      .map(([s, sl]) => styleString(s, sl))
      .join(' ')
    return `${selector} { ${converted}}`
  }

  const nano = nanoCSS.create({
    client: false,
    decl(key, value) {
      key = nano.kebab(key)
      return []
        .concat(value)
        .map((value) => `${key}:${value};`)
        .join(`${EOL}    `)
    },
  })
  unitless(nano)
  prefixer(nano)
  keyframes(nano)
  nano.put(selector, style, atRule)
  return String(nano.raw)
}

styleString.fromStyles = (styles) =>
  Object.keys(styles)
    .map((selector) => styleString(selector, styles[selector]))
    .filter(Boolean)
    .join(EOL)

module.exports = styleString
