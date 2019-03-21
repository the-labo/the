/**
 * As pon task
 */

'use strict'

const TheLint = require('./lib/TheLint')
const chalk = require('chalk')
const rules = require('./lib/rules')

function theLintTask(config) {
  return async function task(ctx) {
    const { logger } = ctx
    const subLogger = logger.withoutPrefix ? logger.withoutPrefix() : logger
    const errorReports = {}
    for (const [pattern, specs] of Object.entries(config)) {
      const lint = await new TheLint()
      for (const [name, value] of Object.entries(specs)) {
        const rule = rules[name]
        if (!rule) {
          throw new Error(`Unknown rule: ${name}`)
        }
        lint.add(pattern, rule(value))
      }
      const found = await lint.run()
      const entries = Object.entries(found)
      for (const [filename, reports] of entries) {
        errorReports[filename] = [
          ...(errorReports[filename] || []),
          ...reports
        ]
      }
      const ok = entries.length === 0
      const icon = ok ? chalk.green('✓') : chalk.red('⚠')
      subLogger.trace(`${icon} ${ok ? pattern : chalk.red(pattern)}`)
    }
    const isOK = Object.keys(errorReports).length === 0
    if (isOK) {
      logger.debug('Everything is OK.')
    } else {
      logger.fatal('Lint failed.')
      for (const [filename, reports] of Object.entries(errorReports)) {
        TheLint.logErrorReports(filename, reports)
      }
      process.exitCode = 1
    }
    return Object.keys(errorReports)
  }
}

module.exports = Object.assign(theLintTask, { rules })
