'use strict'

/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/component
 */
const path = require('path')
const { camelcase } = require('stringcase')
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
    links,
    overview: 'doc/overview.md',
    pkg,
    repo: pkg.repository,
    sections: 'doc/readme/*.md.hbs',
    vars: {
      jsdoc: (jsdoc || []).reduce((reduced, item) => {
        const { kind } = item
        const items = reduced.hasOwnProperty(kind) ? reduced[kind] : []
        return {
          ...reduced,
          [item.kind]: [...items, item],
        }
      }, {}),
    },
  })
}

exports.Index = (dirname) => {
  const pkg = require(path.resolve(dirname, '../package.json'))

  return {
    ...dir({
      annotations: {
        description: pkg.description,
        module: pkg.name,
        typicalname: camelcase(pkg.name.split('/').pop()),
        version: pkg.version,
      },
      dirname,
    }),
    path: `${dirname}/index.jsx`,
  }
}

exports.Test = (dirname) =>
  test({
    cjs: true,
    content: ({ varName }) => `ok(React.createElement(${varName}))`,
    deps: { React: 'react' },
    dest: dirname,
    src: [`${dirname}/../shim/*.js`],
    useDefault: true,
  })
