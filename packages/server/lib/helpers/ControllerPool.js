/**
 * @function ControllerPool
 */
'use strict'

function ControllerPool() {
  const instanceHash = {}
  const keyFor = (cid, socketId) => [cid, socketId].join('@')
  const controllerPool = {
    add(cid, socketId, controllerName, instance) {
      const key = keyFor(cid, socketId)
      if (!instanceHash[key]) {
        instanceHash[key] = {}
      }
      instanceHash[key][controllerName] = instance
    },
    get(cid, socketId, controllerName) {
      const all = controllerPool.getAll(cid, socketId) || {}
      return all[controllerName]
    },
    getAll(cid, socketId) {
      const key = keyFor(cid, socketId)
      return instanceHash[key] || {}
    },
  }
  return controllerPool
}

module.exports = ControllerPool
