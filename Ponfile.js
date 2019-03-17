/**
 * Pon tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')

module.exports = pon({

  ...{},
  // -----------------------------------
  // Main Tasks
  // -----------------------------------
  ...{
    prepare: []
  },
  // -----------------------------------
  // Aliases
  // -----------------------------------
  ...{
    /** Shortcut for 'prepare` task */
    pre: 'prepare',
  },

})
