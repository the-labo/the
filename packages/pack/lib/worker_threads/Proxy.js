'use strict'

const asleep = require('asleep')
const uuid = require('uuid')
const { Worker } = require('worker_threads')

function Proxy(filename, options = {}) {
  const { timeout = 30 * 1000 } = options
  const worker = new Worker(filename)
  const call = async (cmd, ...args) => {
    const iid = uuid.v4()
    return new Promise((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new Error('[@the-/pack] Proxy timeout'))
      }, timeout)
      const onMessage = (message) => {
        const hit = iid === message.iid
        if (!hit) {
          return
        }
        clearTimeout(timeoutTimer)
        resolve(message.result)
        worker.off('message', onMessage)
      }
      worker.on('message', onMessage)
      worker.postMessage({
        args,
        cmd,
        iid,
      })
    })
  }
  const proxy = {
    async close() {
      // TODO wait all calls to finish
      await asleep(100)
      await worker.terminate()
    },
    async decode(values) {
      return call('decode', values)
    },
    async encode(values) {
      return call('encode', values)
    },
  }

  return proxy
}

module.exports = Proxy
