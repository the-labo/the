'use strict'
const acorn = require('acorn')
const logSyntaxError = require('log-syntax-error')

function detectUnsupportedCode(code, ecmaVersion) {
  try {
    acorn.parse(code, { ecmaVersion, silent: true })
  } catch (thrown) {
    const {
      loc: { column, line },
      message,
    } = thrown
    const snippet = logSyntaxError(String(code), line, column)
    return { message, snippet }
  }
  return null
}

module.exports = detectUnsupportedCode