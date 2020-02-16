'use strict'

const { decode, encode } = require('../create')

const handlers = { decode, encode }

function listen() {
  onmessage = (message) => {
    const {
      data: { args, cmd, iid },
    } = message
    const handler = handlers[cmd]
    if (!handler) {
      throw new Error(`Unknown command :${cmd}`)
    }
    const result = handler(...args)
    postMessage({
      cmd,
      iid,
      result,
    })
  }

  onmessageerror = (error) => {
    console.error('message error', error)
  }
}

module.exports = listen
