/**
 * Define coz bud for templates
 * @function templates
 * @returns {Object}
 */
'use strict'

const aglob = require('aglob')
const { ok } = require('assert')
const fs = require('fs')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends templates */
function templates(config) {
  let { cjs = config.node, dirname } = config
  const TMPL_PATH = cjs ? _tmpl('cjs_templates.hbs') : _tmpl('templates.hbs')
  ok(!!dirname, 'config.dirname is required')
  return {
    data: {
      files: aglob.sync('**/*.hbs', { cwd: dirname }).map((filename) => ({
        content: fs.readFileSync(path.join(dirname, filename)),
        filename,
        name: filename.replace(/\.hbs$/, ''),
      })),
    },
    force: true,
    mode: '444',
    tmpl: TMPL_PATH,
  }
}

module.exports = templates
