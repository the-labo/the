'use strict'
/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/lib
 */

const path = require('path')
const { Readme, dir, test } = require('../lib')

exports.Readme = (dirname) => {
  const requireIfPossible = (id) => {
    try {
      return require(id)
    } catch (e) {
      return null
    }
  }

  const pkg = requireIfPossible(path.resolve(dirname, 'package.json'))
  const links = requireIfPossible(path.resolve(dirname, './doc/links'))
  const jsdoc = requireIfPossible(path.resolve(dirname, './doc/api/jsdoc'))
  return Readme({
    badges: { npm: true },
    links: links,
    overview: 'doc/overview.md',
    pkg,
    repo: pkg.repository,
    sections: 'doc/readme/*.md.hbs',
    api: jsdoc && {
      path: './doc/api/api.md',
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
      license: pkg.license,
    }
  })
}

exports.Test = (dirname) => {
  return test({
    src: [`${dirname}/../lib/**/*.js`],
    dest: dirname,
    cjs: true,
  })
}
