'use strict'

const aglob = require('aglob')
const {
  strict: { ok },
} = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/**
 * Define bud for readme
 * @memberof module:@the-/templates
 * @function test
 * @returns {Object}
 */
function test(config) {
  const {
    cjs = config.node,
    content = () => '',
    deps = {},
    dest = process.cwd(),
    src,
    useDefault = false,
  } = config
  const TMPL_PATH = cjs ? _tmpl('cjs_test.hbs') : _tmpl('test.hbs')
  ok(!!src, 'config.src is required.')
  return aglob
    .sync(src)
    .filter((src) => path.basename(src) !== 'index.js')
    .filter((src) => path.basename(src) !== 'index.jsx')
    .filter((src) => !/^[._-]/.test(path.basename(src)))
    .filter((src) => {
      try {
        return !!require.resolve(src)
      } catch (e) {
        return false
      }
    })
    .map((src) => {
      const extname = path.extname(src)
      const basename = path.basename(src, extname)
      const suffix = 'Test'
      const name = String(basename)
      const varNameChanged = ['default'].includes(name)
      const varName = varNameChanged ? `${name}_` : name
      return {
        data: {
          content: content({ name, varName }),
          deps,
          name,
          relative: path.relative(dest, src).replace(extname, ''),
          useDefault,
          varName,
          varNameChanged,
        },
        force: false,
        mkdirp: true,
        mode: '644',
        path: path.resolve(dest, basename + suffix + extname),
        tmpl: TMPL_PATH,
      }
    })
}

test.dir = function testDir(config) {
  const {
    cjs = config.node,
    content = () => '',
    deps = {},
    dest = process.cwd(),
    ext = cjs ? '.js' : '.mjs',
    src,
  } = config
  const TMPL_PATH = cjs ? _tmpl('cjs_test.hbs') : _tmpl('test.hbs')
  ok(!!src, 'config.src is required.')
  const suffix = 'Test'
  return [].concat(src).map((src) => {
    const name = path.basename(src)
    return {
      data: {
        content: content({ name }),
        deps,
        name,
        relative: path.relative(dest, src),
      },
      force: false,
      mkdirp: true,
      mode: '644',
      path: path.resolve(dest, path.basename(src) + suffix) + ext,
      tmpl: TMPL_PATH,
    }
  })
}

module.exports = test
