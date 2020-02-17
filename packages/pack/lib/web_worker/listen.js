'use strict'

const create = require('../create')

const { decode, encode } = create()

const handlers = { decode, encode }

function listen() {
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  onmessageerror = (error) => {
    console.error('message error', error)
  }
}

module.exports = listen

/* global postMessage */
