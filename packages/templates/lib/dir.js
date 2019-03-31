/**
 * Define coz bud for dir
 * @function dir
 * @returns {Object}
 */
'use strict'

const aglob = require('aglob')
const fs = require('fs')
const path = require('path')
const reserved = require('reserved')
const { findupDir } = require('@the-/util-path')
const _tmpl = require('./_tmpl')

const shouldRequire = (name) => {
  return (
    !/^[._]/.test(name) &&
    !['index.jsx', 'index.js', 'package.json'].includes(name) &&
    ['.jsx', '.js', '.json', '.mjs', ''].includes(path.extname(name))
  )
}

const handleRestConfig = (rest) => {
  const restKeys = Object.keys(rest)
  if (restKeys.length > 0) {
    console.warn(`[the-templates][dir] Unknown configs: ${restKeys}`)
  }
}

const isModule = (filename) => {
  try {
    return !!require.resolve(filename)
  } catch (e) {
    return false
  }
}

const guessName = (dirname) => {
  if (!dirname) {
    return null
  }
  const pkgDir = findupDir.sync(dirname, { contains: ['package.json'] })
  if (!pkgDir) {
    return null
  }
  const pkg = require(path.join(pkgDir, 'package.json'))
  return path.join(pkg.name, path.relative(pkgDir, dirname))
}

/** @lends dir */
function dir(config) {
  const {
    cjs = config.node,
    description,
    dirname,
    ext,
    name = guessName(config.dirname),
    ...rest
  } = config
  handleRestConfig(rest)
  const TMPL_PATH = cjs ? _tmpl('cjs_dir.hbs') : _tmpl('dir.hbs')
  const modules = fs
    .readdirSync(dirname)
    .filter((name) => shouldRequire(name))
    .map((name) => path.join(dirname, name))
    .filter((filename) => isModule(filename))
    .map((filename) => {
      const pathName = path.basename(filename, path.extname(filename))
      const name = pathName.replace(/^\d+\./, '')
      const varNameChanged = reserved.includes(name)
      return {
        name,
        path: pathName,
        varName: (varNameChanged ? name + '_' : name) + '_',
        varNameChanged,
      }
    })
    .filter(({ name }) => name !== 'index')
  return {
    data: {
      defaultModule: modules.find(({ name }) => name === 'default'),
      description,
      modules: modules.filter(({ name }) => name !== 'default'),
      name,
    },
    force: true,
    mode: '444',
    path: `${dirname}/index${ext || (cjs ? '.js' : '.mjs')}`,
    tmpl: TMPL_PATH,
  }
}

Object.assign(dir, {
  recursive(config) {
    const {
      cjs = config.node,
      description,
      dirname,
      ext,
      ignore = [],
      name = guessName(config.dirname),
      tmpl,
      ...rest
    } = config
    handleRestConfig(rest)
    const TMPL_PATH = tmpl || (cjs ? _tmpl('cjs_dir.hbs') : _tmpl('dir.hbs'))
    const modules = aglob
      .sync('**/*.*', { cwd: dirname, ignore: [].concat(ignore) })
      .filter((name) => shouldRequire(path.basename(name)))
      .map((name) => path.join(dirname, name))
      .filter((filename) => isModule(filename))
      .map((filename) => {
        const basename = path.basename(filename, path.extname(filename))
        const name = String(basename)
        const varNameChanged = reserved.includes(name)
        return {
          name,
          path: path.join(
            path.relative(dirname, path.dirname(filename)),
            basename,
          ),
          varName: (varNameChanged ? name + '_' : name) + '_',
          varNameChanged,
        }
      })
      .filter(({ name }) => name !== 'index')
    return {
      data: {
        defaultModule: modules.find(({ name }) => name === 'default'),
        description,
        modules: modules.filter(({ name }) => name !== 'default'),
        name,
      },
      force: true,
      mode: '444',
      path: `${dirname}/index${ext || (cjs ? '.js' : '.mjs')}`,
      tmpl: TMPL_PATH,
    }
  },
})

module.exports = dir
