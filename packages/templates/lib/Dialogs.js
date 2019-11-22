'use strict'

const aglob = require('aglob')
const {
  strict: { ok },
} = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/**
 * Define bud for Dialog components
 * @memberof module:@the-/templates
 * @function Dialogs
 * @param {Object} config
 * @returns {Object}
 */
function Dialogs(config) {
  const {
    dirname,
    from = '../stateful',
    memberof = config.memberOf || 'ui',
    pattern = ['**/*Dialog.jsx'],
  } = config

  const componentFiles = aglob.sync(pattern, { cwd: dirname }).sort()

  const components = componentFiles.map((filename) => {
    const name = path.basename(filename, '.jsx')
    return {
      name,
      requirePath: `./${path.join(from, filename)}`,
    }
  })

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
