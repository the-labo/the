'use strict'

const readline = require('readline')
const { inspect } = require('util')

/**
 * @memberof module:@the-/db.helpers
 * @function createTerminal
 * @param handler
 * @param [options={}]
 * @returns {Promise<*>}
 */
async function createTerminal(handler, options = {}) {
  const { prompt = '>' } = options
  return new Promise((resolve, reject) => {
    const r = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt,
    })

    r.on('line', (line) => {
      Promise.resolve(handler(String(line).trim()))
        .then((result) => {
          const empty = typeof result === 'undefined' || result === ''
          if (!empty) {
            console.log(inspect(result))
          }

          next()
        })
        .catch((e) => {
          delete e.stack
          console.log(inspect(e))
          next()
        })
    })

    r.on('close', () => resolve())
    r.on('error', (e) => reject(e))

    const next = () => setTimeout(() => r.prompt(), 1)
    next()
  })
}

module.exports = createTerminal
