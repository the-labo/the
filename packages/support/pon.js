'use strict'

const chalk = require('chalk')
const path = require('path')
const theSupport = require('./lib/create')

/**
 * As pon task
 * @function theSupportTask
 * @param {string} pattern
 * @param {Object} [options={}]
 * @returns {function()} Task function
 */
function theSupportTask(pattern, options = {}) {
  const support = theSupport(pattern)
  const { version = '2020' } = options

  return async function task(ctx) {
    const { logger } = ctx
    const subLogger = logger.withoutPrefix ? logger.withoutPrefix() : logger

    let results
    try {
      results = await support.validateESFor(version)
    } catch (e) {
      logger.error(e.message)

      console.log('')
      console.log(e.filename)
      console.log('-----------')
      console.log(e.snippet)
      console.log('-----------')
      console.log('')

      process.exit(1)
    }
    const filenames = Object.entries(results || {})
      .filter(([, { ok }]) => ok)
      .map(([filename]) => path.relative(process.cwd(), filename))
    const icon = chalk.green('✓')
    for (const filename of filenames) {
      subLogger.trace(`${icon} ${filename}`)
    }
    return filenames
  }
}

module.exports = theSupportTask
