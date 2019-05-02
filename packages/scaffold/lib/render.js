/**
 * @memberof module:@the-/scaffold
 * @function render
 */
'use strict'

const tmplconv = require('tmplconv')

const prefix = '~~~~'
const suffix = '~~~~'

/** @lends module:@the-/scaffold.render */
async function render(tmpl, dest, config, options = {}) {
  return tmplconv.render(tmpl, dest, {
    clean: false,
    data: config,
    ignore: ['.DS_Store', '.svg'],
    once: false,
    pattern: ['**/*.*', '.*', '**/.*.bud.tmpl', '**/.*.hbs.tmpl'],
    prefix,
    silent: options.silent,
    suffix,
  })
}

module.exports = render
