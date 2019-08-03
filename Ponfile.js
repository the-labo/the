/**
 * Pon tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const { coz } = require('pon-task-basic')

module.exports = pon({
  $cwd: __dirname,
  'struct:render': coz('.*.bud'),
  /** Shortcut for 'build` task */
  b: 'build',
  build: ['struct'],
  pre: 'prepare',
  prepare: [],
  struct: ['struct:render'],
})
