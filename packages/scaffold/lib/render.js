'use strict'

const tmplconv = require('tmplconv')

const prefix = '~~~~'
const suffix = '~~~~'

/**
 * @memberof module:@the-/scaffold
 * @function render
 * @param tmpl
 * @param dest
 * @param config
 * @param [options={}]
 * @returns {Promise<*>}
 */
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
