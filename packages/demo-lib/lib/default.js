/**
 * Default exports
 * @function theDemoLib
 * @returns {TheDemoLib}
 */
'use strict'

const create = require('./create')
const TheDemoLib = require('./TheDemoLib')

const lib = create.bind(create)

/** @lends theDemoLib */
<<<<<<< HEAD
module.exports = Object.assign(
  lib,
=======
module.exports = Object.assign(lib,
>>>>>>> origin/master
  /** @lends theDemoLib */
  {
    TheDemoLib,
    create,
<<<<<<< HEAD
  },
=======
  }
>>>>>>> origin/master
)
