'use strict'

const { parentPort } = require('worker_threads')
const create = require('../create')

const { decode, encode } = create()

const handlers = { decode, encode }

function listen() {
  parentPort.on('message', (message) => {
    const { args, cmd, iid } = message
    const handler = handlers[cmd]
    if (!handler) {
      throw new Error(`Unknown command :${cmd}`)
    }

    const result = handler(...args)
    parentPort.postMessage({
      cmd,
      iid,
      result,
    })
  })
}

module.exports = listen
