'use strict'

/**
 * @memberof module:@the-/code
 * @function run
 */
const logger = require('colorprint')
const path = require('path')
const create = require('./create')

/** @lends module:@the-/code.run */
async function run(pattern, options = {}) {
  const { ignore = ['**/*.min.*', '*/node_modules/*.*'], ...config } = options
  const code = create(config)
  const results = await code.format(pattern, { ignore })
  const filenames = results
    .filter(({ skipped }) => !skipped)
    .map(({ filename }) => path.relative(process.cwd(), filename))
  for (const filename of filenames) {
    logger.debug('File formatted:', filename)
  }
}

module.exports = run
