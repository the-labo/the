'use strict'

/**
 * Create "filenameRule" lint
 * @memberof module:@the-/lint.rules
 * @function filenameRule
 * @param {Object} config - Lint config
 * @param {string|RegExp} config.startsWith - Ends with
 * @param {string|RegExp} config.endsWith - Ends with
 * @returns {function()} Lint function
 */
const path = require('path')
const { parsePattern } = require('../helpers/parseHelper')

/** @lends module:@the-/lint.rules.filenameRule */
function filenameRule(config) {
  const { endsWith, pattern, startsWith, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn('[filenameRule] Unknown options', Object.keys(rest))
  }

  return async function filenameRuleCheck({ filename, report }) {
    const basename = path.basename(filename)
    if (startsWith) {
      const ok = basename.startsWith(startsWith)
      !ok &&
        report('Unexpected filename', {
          actual: basename,
          expect: { startsWith },
          where: path.resolve(filename),
        })
    }

    if (endsWith) {
      const ok = basename.endsWith(endsWith)
      !ok &&
        report('Unexpected filename', {
          actual: basename,
          expect: { endsWith },
          where: path.resolve(filename),
        })
    }

    if (pattern) {
      const ok = !!basename.match(parsePattern(pattern))
      !ok &&
        report('Unexpected filename', {
          actual: basename,
          expect: { pattern },
          where: path.resolve(filename),
        })
    }
  }
}

module.exports = filenameRule
