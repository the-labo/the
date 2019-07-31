'use strict'

/**
 * Define bud for Dialog components
 * @memberof module:@the-/templates
 * @function Dialogs
 * @param {Object} config
 * @returns {Object}
 */
const aglob = require('aglob')
const {
  strict: { ok },
} = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Dialogs */
function Dialogs(config) {
  const {
    dirname,
    from = '../stateful',
    memberof = config.memberOf || 'ui',
    pattern = ['**/*Dialog.jsx'],
  } = config

  const components = aglob
    .sync(pattern, { cwd: dirname })
    .map((filename) => path.basename(filename, '.jsx'))
    .sort()

  ok(!!dirname, 'config.dirname is required')
  if (components.length === 0) {
    console.warn(`[the-template] No dialogs found in ${dirname}`)
  }
  return {
    data: {
      components,
      from,
      memberof,
    },
    force: true,
    mode: '444',
    tmpl: _tmpl('Dialogs.hbs'),
  }
}

module.exports = Dialogs
