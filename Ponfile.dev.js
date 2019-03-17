/**
 * Pon dev tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const pkgSync = require('./misc/tasks/pkgSync')
const pkgPublish = require('./misc/tasks/pkgPublish')
const theCode = require('the-code/pon')

const { cwd, tasks } = require('./Ponfile')

module.exports = pon({
  // -----------------------------------
  // Meta info
  // -----------------------------------
  ...{
    $cwd: cwd,
    $dev: true,
  },

  // -----------------------------------
  // From Ponfile.js
  // -----------------------------------
  ...tasks,
  ...{
    'pkg:sync': pkgSync('package.json', 'packages/*/package.json'),
    'pkg:publish': pkgPublish('packages/*/package.json')
  },

  // -----------------------------------
  // Format Tasks
  // -----------------------------------
  ...{
    'format:root': theCode([
      '.*.bud',
      '.travis.yml',
      '+(misc)/**/*.js'
    ]),
    'format:packages': theCode([
      'packages/*/+(bin|example|doc|lib|misc|test)/**/*.js',
      'packages/*/+(bin|example|doc|lib|misc|test)/**/.*.bud',
      'packages/*/.*.bud',
    ], {
      ignore: '**/node_modules/**/*.*'
    })
  },
  // -----------------------------------
  // Main Tasks
  // -----------------------------------
  ...{
    format: ['format:root', 'format:packages'],
    prepare: [
      ...tasks.prepare,
      ...['pkg:sync'],
    ],
    build: [
      ...['format'],
    ],
    publish: ['build', 'pkg:sync', 'pkg:publish']
  },
  // -----------------------------------
  // Aliases
  // -----------------------------------
  ...{},

})
