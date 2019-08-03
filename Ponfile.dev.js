/**
 * Pon dev tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {
    spawn: { npx },
  },
} = require('pon-task-basic')
const { mocha } = require('pon-task-dev')
const theCode = require('@the-/code/pon')
const pkgInstall = require('./misc/tasks/pkgInstall')
const pkgPublish = require('./misc/tasks/pkgPublish')
const pkgRun = require('./misc/tasks/pkgRun')
const pkgSync = require('./misc/tasks/pkgSync')
const { cwd, tasks } = require('./Ponfile')

const eslint = (dirname, options = {}) => {
  const { fix = false } = options
  return npx(
    'eslint',
    __dirname,
    '--cache',
    '--ext',
    '.jsx,.js',
    ...(fix ? ['--fix'] : []),
  )
}
const SUB_PACKAGES = 'packages/*/package.json'

module.exports = pon({
  $cwd: cwd,
  $dev: true,
  'eslint:check': eslint(__dirname),
  'eslint:fix': eslint(__dirname, { fix: true }),
  ...tasks, // From Ponfile.js
  'format:packages': theCode(
    [
      'packages/*/+(bin|example|doc|lib|misc|test|handy|presets)/**/+(*.js|*.jsx)',
      'packages/*/+(bin|example|doc|lib|misc|test|handy|presets)/**/.*.bud',
      'packages/*/.*.bud',
    ],
    {
      ignore: [
        '**/node_modules/**/*.*',
        '**/shim/**/*.*',
        '**/tmp/**/*.*',
        '**/demo/bundle.js',
        '**/var/**/*.*',
        '**/*.min.js',
      ],
    },
  ),
  'format:root': theCode([
    '.*.bud',
    '.travis.yml',
    '+(misc)/**/*.*',
    '*.js',
    'package.json',
  ]),
  'pkg:install': pkgInstall(SUB_PACKAGES),
  'pkg:publish': pkgPublish(SUB_PACKAGES),
  'pkg:run:build': pkgRun(SUB_PACKAGES, 'build'),
  'pkg:run:doc': pkgRun(SUB_PACKAGES, 'doc'),
  'pkg:run:test': pkgRun(SUB_PACKAGES, 'test'),
  'pkg:sync': pkgSync('package.json', SUB_PACKAGES),
  'test:root': mocha('test/**/*Test.js'),
  build: [...tasks.build, 'pkg:run:build', 'format'],
  doc: ['pkg:run:doc'],
  f: 'format',
  format: ['format:root', 'format:packages'],
  install: ['pkg:install'],
  /** Shortcut for 'lint` task */
  l: 'lint',
  lint: ['eslint:fix', 'eslint:check'],
  prepare: [...tasks.prepare, 'pkg:sync', 'lint'],
  publish: ['pkg:sync', 'pkg:publish'],
  /** Shortcut for 'test` task */
  t: 'test',
  test: ['test:root', 'pkg:run:test'],
})
