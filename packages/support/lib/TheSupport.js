/**
 * @class TheSupport
 * @param {string} pattern - Filename pattern
 */
'use strict'

const aglob = require('aglob')
const { readFileAsync } = require('asfs')
const path = require('path')
const detectUnsupportedCode = require('./helpers/detectUnsupportedCode')
const findEvalCode = require('./helpers/findEvalCode')

/** @lends TheSupport */
class TheSupport {
  static async checkECMASupport(filename, ecmaVersion) {
    const relativeFilename = path.relative(process.cwd(), filename)
    const code = await readFileAsync(filename)
    const detected = detectUnsupportedCode(code, ecmaVersion)

    const handleDetected = (detected, messageCreator) => {
      if (!detected) {
        return
      }
      const { message, snippet } = detected
      const error = new Error(messageCreator(message))
      error.filename = relativeFilename
      error.snippet = snippet
      throw error
    }
    handleDetected(
      detected,
      (message) =>
        `[TheSupport] ES${ecmaVersion} failed with ${relativeFilename} ( ${message} )`,
    )
    const evalCodes = findEvalCode(code)
    for (const { code, loc } of evalCodes) {
      const detected = detectUnsupportedCode(code, ecmaVersion)
      handleDetected(
        detected,
        (message) =>
          `[TheSupport] ES${ecmaVersion} failed with eval code in ${loc.line}:${
            loc.column
          } at ${relativeFilename} ( ${message} )`,
      )
    }
  }

  constructor(pattern, options = {}) {
    this.pattern = pattern
  }

  async es2015() {
    return this.validateESFor('2015')
  }

  async es2016() {
    return this.validateESFor('2016')
  }

  async es2017() {
    return this.validateESFor('2017')
  }

  async es2018() {
    return this.validateESFor('2018')
  }

  async es2019() {
    return this.validateESFor('2019')
  }

  async es5() {
    return this.validateESFor('5')
  }

  async validateESFor(ecmaVersion) {
    const results = {}
    const filenames = await aglob(this.pattern)
    if (filenames.length === 0) {
      console.warn(`[TheSupport] Not file found with pattern`, this.pattern)
      return results
    }
    for (const filename of filenames) {
      await TheSupport.checkECMASupport(filename, ecmaVersion)
      results[filename] = { ok: true }
    }
    return results
  }
}

module.exports = TheSupport
