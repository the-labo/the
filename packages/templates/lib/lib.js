/**
 * Define coz bud for lib
 * @function lib
 * @returns {Object}
 */
'use strict'

const aglob = require('aglob')
const path = require('path')
const _tmpl = require('./_tmpl')

const TMPL_PATH = _tmpl('lib.hbs')

/** @lends lib */
function lib(config) {
  const { dirname, index, pkg } = config
  return {
    data: {
      index,
      modules: aglob
        .sync(['*.js', '*.jsx'], { cwd: dirname })
        .map((filename) => path.basename(filename, path.extname(filename)))
        .filter((name) => name !== 'index'),
      pkg,
    },
    force: true,
    mode: '444',
    tmpl: TMPL_PATH,
  }
}

module.exports = lib
