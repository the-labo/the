'use strict'
/**
 * As pon task
 */
const chalk = require('chalk')
const TheSpell = require('./lib/TheSpell')

function theSpellTask(patterns, opitons = {}) {
  const { ignore = [], words } = opitons
  return async function task(ctx) {
    const { logger } = ctx
    const subLogger = logger.withoutPrefix ? logger.withoutPrefix() : logger
    const spell = new TheSpell({
      words,
    })
    for (const pattern of [].concat(patterns).filter(Boolean)) {
      const reports = await spell.check(pattern, {
        ignore,
      })
      const ok = reports.length === 0
      const icon = ok ? chalk.green('✓') : chalk.red('⚠')
      subLogger.trace(`${icon} ${ok ? pattern : chalk.red(pattern)}`)
      if (ok) {
        logger.debug('Everything is OK.')
      } else {
        logger.fatal('Spell failed.')
        TheSpell.logErrorReports(reports)
        process.exitCode = 1
      }
    }
  }
}

module.exports = Object.assign(theSpellTask, {})
