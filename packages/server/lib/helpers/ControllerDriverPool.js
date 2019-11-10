'use strict'

function ControllerDriverPool() {
  const instanceHash = {}
  const keyFor = (cid, socketId) => [cid, socketId].join('@')
  const fromKey = (key) => key.split('@')
  const controllerDriverPool = {
    get length(){
      return Object.keys(instanceHash).length
    },
    add(cid, socketId, controllerName, instance) {
      const key = keyFor(cid, socketId)
      if (!instanceHash[key]) {
        instanceHash[key] = {}
      }

      instanceHash[key][controllerName] = instance
    },
    get(cid, socketId, controllerName) {
      const all = controllerDriverPool.getAll(cid, socketId) || {}
      return all[controllerName]
    },
    getAll(cid, socketId) {
      const key = keyFor(cid, socketId)
      return instanceHash[key] || {}
    },
    delAll(cid, socketId){
      const key = keyFor(cid, socketId)
      delete instanceHash[key]
    },
    async each(handler) {
      for (const [key, hash] of Object.entries(instanceHash)) {
        const [cid, socketId] = fromKey(key)
        for (const instance of Object.values(hash)) {
          await handler(instance, {cid, socketId})
        }
      }
    },
  }
  return controllerDriverPool
}

module.exports = ControllerDriverPool
