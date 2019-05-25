'use strict'
/**
 * Add cli methods
 * @memberof module:@the-/db
 * @function cliMix
 */
const aslogger = require('aslogger')
const { clone } = require('asobj')
const { inspect } = require('util')
const { evalScript } = require('@the-/util-db')
const createTerminal = require('../helpers/createTerminal')

/** @lends module:@the-/db.cliMix */
function cliMix(Class) {
  /**
   * @memberof module:@the-/db.cliMix
   * @inner
   */
  class CliMixed extends Class {
    async cli() {
      const { env, resources } = this
      const resourceNames = Object.keys(resources)
      const logger = aslogger({})
      const info = clone(env, {
        without: ['password', 'rootPassword', 'root_password'],
      })
      logger.point('Welcome to the-db prompt!')
      logger.trace('DB Env:', inspect(info, { breakLength: Infinity }))
      logger.trace(
        'DB Resources:',
        inspect(resourceNames, { breakLength: Infinity }),
      )
      logger.info('')
      await createTerminal(
        (line) => {
          if (!line) {
            return
          }
          // TODO Support multi-line script
          try {
            return evalScript(line, {
              prefix: resourceNames
                .map((name) => `const ${name} = db.resources.${name}`)
                .join(';'),
              variables: { db: this, global: {}, resources },
            })
          } catch (e) {
            delete e.stack
            console.log(inspect(e))
          }
        },
        { prompt: 'the-db> ' },
      )
      await this.close()
    }
  }

  return CliMixed
}

module.exports = cliMix
