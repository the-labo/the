'use strict'

const create = require('../create')

const { decode, encode } = create()

const handlers = { decode, encode }

function listen() {
  self.onmessage = (message) => {
    const {
      data: { args, cmd, iid },
    } = message
    const handler = handlers[cmd]
    if (!handler) {
      throw new Error(`Unknown command :${cmd}`)
    }

    const result = handler(...args)
    self.postMessage({
      cmd,
      iid,
      result,
    })
  }
  self.onmessageerror = (error) => {
    console.error('message error', error)
  }
}

module.exports = listen

/* global postMessage */
