'use strict'
/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/lib
 */


const path = require('path')
const { Readme, dir, test } = require('../lib')

exports.Readme = (dirname) => {
  const pkg = require(path.resolve(dirname, 'package.json'))
  const links = require(path.resolve(dirname, './doc/links'))
  const jsdoc = require(path.resolve(dirname, './doc/api/jsdoc'))
  return Readme({
    badges: { npm: true },
    links: links,
    overview: 'doc/overview.md',
    pkg,
    repo: pkg.repository,
    sections: 'doc/readme/*.md.hbs',
    vars: {
      jsdoc: jsdoc.reduce(
        (reduced, item) => {
          const { kind } = item
          const items = reduced.hasOwnProperty(kind) ? reduced[kind] : []
          return {
            ...reduced,
            [item.kind]: [...items, item],
          }
        },
        {},
      ),
    },
  })

}

exports.Index = (dirname) => {
  const pkg = require(path.resolve(dirname, '../package.json'))
  return dir({
    cjs: true,
    dirname: dirname,
    name: pkg.name,
    description: pkg.description,
  })
}

exports.Test = (dirname) => {
  return test({
    src: [
      `${dirname}/../lib/**/*.js`
    ],
    dest: dirname,
    cjs: true
  })
}
