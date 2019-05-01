'use strict'
/**
 * Presets for `@the-/*` packages
 * @module @the-script/presets/component
 */

const path = require('path')
const { Readme, dir, test } = require('../lib')
const { camelcase } = require('stringcase')

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
      dirname: dirname,
      annotations: {
        module: pkg.name,
        typicalname: camelcase(pkg.name.split('/').pop()),
        version: pkg.version,
        description: pkg.description,
      },
    }),
    path: `${dirname}/index.jsx`,
  }
}

exports.Test = (dirname) => {
  return test({
    src: [`${dirname}/../shim/*.js`],
    useDefault: true,
    deps: { React: 'react' },
    content: ({ varName }) => `ok(React.createElement(${varName}))`,
    dest: dirname,
    cjs: true,
  })
}
