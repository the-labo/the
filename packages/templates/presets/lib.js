'use strict'
/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/lib
 */

const path = require('path')
const { Readme, dir, test } = require('../lib')
const { camelcase } = require('stringcase')

exports.Readme = (dirname, options = {}) => {
  const {
    jsdocPath = './doc/api/jsdoc',
    jsdocLink = './doc/api/api.md',
    linksPath = './doc/links',
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
  return Readme({
    badges: { npm: !pkg.private },
    links: links,
    overview: 'doc/overview.md',
    pkg,
    repo: pkg.repository,
    sections: 'doc/readme/*.md.hbs',
    api: jsdoc && {
      path: jsdocLink,
      jsdoc: jsdoc,
    },
  })
}

exports.Index = (dirname) => {
  const pkg = require(path.resolve(dirname, '../package.json'))
  return dir({
    cjs: true,
    dirname: dirname,
    annotations: {
      module: pkg.name,
      version: pkg.version,
      description: pkg.description,
      typicalname: camelcase(pkg.name.split('/').pop()),
      license: pkg.license,
    },
  })
}

exports.Test = (dirname) => {
  return test({
    src: [`${dirname}/../lib/**/*.js`],
    dest: dirname,
    cjs: true,
  })
}
