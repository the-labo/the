/**
 * Script runner
 * @class TheRun
 * @param {Object} [options={}] - Optional settings
 * @param {number|Boolean} [options.inspect] -  Inspect port
 */
'use strict'

const { spawn } = require('child_process')
const fkill = require('fkill')

/** @lends TheRun */
class TheRun {
  constructor(options = {}) {
    const { catcher = true, inspect = false } = options

    this.catcherEnabled = catcher
    this.inspectPort = inspect
  }

  async run(filename) {
    const { catcherEnabled, inspectPort } = this
    if (inspectPort) {
      await fkill(`:${inspectPort}`).catch(() => null) // Do nothing
    }
    await new Promise((resolve, reject) => {
      const spawned = spawn(
        'node',
        [
          ...(inspectPort ? [`--inspect=${inspectPort}`] : []),
          ...(catcherEnabled
            ? [`--require`, require.resolve('../catcher')]
            : []),
          filename,
        ],
        {
          stdio: 'inherit',
        },
      )
      spawned.on('close', resolve)
      spawned.on('error', reject)
    })
  }
}

module.exports = TheRun