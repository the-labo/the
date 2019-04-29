/**
 * Define bud for Dialog components
 * @memberOf module:@the-/templates
 * @function Dialogs
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const aglob = require('aglob')
const { ok } = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Dialogs */
function Dialogs(config) {
  let { dirname, from = '../stateful', pattern = [`**/*Dialog.jsx`] } = config

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
    },
    force: true,
    mode: '444',
    tmpl: _tmpl('Dialogs.hbs'),
  }
}

module.exports = Dialogs
