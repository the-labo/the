'use strict'

function ControllerDriverPool() {
  const instanceHash = {}
  const keyFor = (cid, socketId) => [cid, socketId].join('@')
  const controllerDriverPool = {
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
    async each(handler) {
      for (const hash of Object.values(instanceHash)) {
        for (const instance of Object.values(hash)) {
          await handler(instance)
        }
      }
    },
  }
  return controllerDriverPool
}

module.exports = ControllerDriverPool
