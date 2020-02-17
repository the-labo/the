'use strict'

const uuid = require('uuid')
const { Worker } = require('worker_threads')

function Proxy(filename) {
  const worker = new Worker(filename)
  const call = async (cmd, ...args) => {
    const iid = uuid.v4()
    return new Promise((resolve) => {
      const onMessage = (message) => {
        const hit = iid === message.iid
        if (!hit) {
          return
        }

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
      worker.terminate()
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
