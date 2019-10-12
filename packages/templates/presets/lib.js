'use strict'

/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/lib
 */
const path = require('path')
const { camelcase } = require('stringcase')
const { Readme, dir, test } = require('../lib')

exports.Readme = (dirname, options = {}) => {
  const {
    jsdocLink = './doc/api/api.md',
    jsdocPath = './doc/api/jsdoc',
    linksPath = './doc/links',
    vars = {},
  } = options
  const requireIfPossible = (id) => {
    try {
      return require(id)
    } catch (e) {
      return null
    }
  }

  const pkg = requireIfPossible(path.resolve(dirname, 'package.json'))
  const links = requireIfPossible(path.resolve(dirname, linksPath))
  const jsdoc = requireIfPossible(path.resolve(dirname, jsdocPath))
  const findRepo = () => {
    const { repository } = pkg
    if (typeof repository === 'string') {
      return repository
    }

    try {
      const url = new URL(repository.url)
      return url.pathname.replace(/\.git$/, '')
    } catch (e) {
      return null
    }
  }
  return Readme({
    api: jsdoc && {
      jsdoc,
      path: jsdocLink,
    },
    badges: { npm: !pkg.private },
    links,
    overview: 'doc/overview.md',
    pkg,
    repo: findRepo,
    sections: 'doc/readme/*.md.hbs',
    vars,
  })
}

exports.Index = (dirname) => {
  const pkg = require(path.resolve(dirname, '../package.json'))

  return dir({
    annotations: {
      description: pkg.description,
      license: pkg.license,
      module: pkg.name,
      typicalname: camelcase(pkg.name.split('/').pop()),
      version: pkg.version,
    },
    cjs: true,
    dirname,
  })
}

exports.Test = (dirname) =>
  test({
    cjs: true,
    dest: dirname,
    src: [`${dirname}/../lib/**/*.js`],
  })
