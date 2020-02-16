'use strict'

const uuid = require('uuid')

function Proxy(url) {
  const worker = new Worker(url)
  const call = async (cmd, ...args) => {
    const iid = uuid.v4()
    return new Promise((resolve) => {
      const onMessage = ({ data }) => {
        const hit = iid === data.iid
        if (!hit) {
          return
        }
        resolve(data.result)
        worker.removeEventListener('message', onMessage)
      }
      worker.addEventListener('message', onMessage)
      worker.postMessage({
        args,
        cmd,
        iid,
      })
    })
  }
  return {
    close() {
      worker.terminate()
    },
    async decode(values) {
      return call('decode', values)
    },
    async encode(values) {
      return call('encode', values)
    },
  }
}

module.exports = Proxy
