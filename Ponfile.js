/**
 * Pon tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const { coz } = require('pon-task-basic')

module.exports = pon({
  // -----------------------------------
  // Meta info
  // -----------------------------------
  ...{
    $cwd: __dirname,
  },
  ...{
    'struct:render': coz('.*.bud')
  },
  // -----------------------------------
  // Main Tasks
  // -----------------------------------
  ...{
    struct: ['struct:render'],
    prepare: [],
    build: ['struct']
  },
  // -----------------------------------
  // Aliases
  // -----------------------------------
  ...{
    /** Shortcut for 'prepare` task */
    pre: 'prepare',
    /** Shortcut for 'build` task */
    b: 'build',
  },

})
