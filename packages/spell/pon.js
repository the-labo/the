'use strict'

/**
 * As pon task
 */
const chalk = require('chalk')
const TheSpell = require('./lib/TheSpell')

function theSpellTask(patterns, opitons = {}) {
  const { ignore = [], maxWordLength, minWordLength, words } = opitons
  return async function task(ctx) {
    const { logger } = ctx
    const subLogger = logger.withoutPrefix ? logger.withoutPrefix() : logger
    const spell = new TheSpell({
      maxWordLength,
      minWordLength,
      words,
    })
    const errorReports = {}
    for (const pattern of [].concat(patterns).filter(Boolean)) {
      const reports = await spell.check(pattern, {
        ignore,
      })
      const ok = reports.length === 0
      if (!ok) {
        errorReports[pattern] = reports
      }

      const icon = ok ? chalk.green('✓') : chalk.red('⚠')
      subLogger.trace(`${icon} ${ok ? pattern : chalk.red(pattern)}`)
    }
    const allOK = Object.keys(errorReports).length === 0
    if (allOK) {
      logger.debug('Everything is OK.')
    } else {
      logger.fatal('Spell failed.')
      for (const [, reports] of Object.entries(errorReports)) {
        TheSpell.logErrorReports(reports)
      }
      process.exitCode = 1
    }
  }
}

module.exports = Object.assign(theSpellTask, {})
