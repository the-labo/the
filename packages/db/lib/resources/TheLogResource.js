'use strict'
/**
 * Resource of data history
 * @memberof module:@the-/db
 * @class TheLogResource
 */
const amkdirp = require('amkdirp')
const {
  ResourceEvents: {
    ENTITY_CREATE,
    ENTITY_CREATE_BULK,
    ENTITY_DESTROY,
    ENTITY_DESTROY_BULK,
    ENTITY_UPDATE,
    ENTITY_UPDATE_BULK,
  },
} = require('clay-constants')
const cluster = require('cluster')
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const { DataTypes, TheResource } = require('@the-/resource')
const { DATE, STRING } = DataTypes

/** @lends module:@the-/db.TheLogResource */
class TheLogResource extends TheResource {
  static get policy() {
    return {
      entityCreatedAt: {
        description: 'Date entity created at',
        type: DATE,
      },
      entityDestroyedAt: {
        description: 'Date entity destroyed at',
        type: DATE,
      },
      entityId: {
        description: 'Id of entity',
        required: true,
        type: STRING,
        uniqueFor: ['resourceName'],
      },
      entityUpdatedAt: {
        description: 'Date entity updated at',
        type: DATE,
      },
      resourceName: {
        description: 'Name of resource',
        required: true,
        type: STRING,
      },
    }
  }

  static get schema() {
    return this.policy
  }

  constructor(...args) {
    super(...args)
    const Log = this

    Log.data = {}
    Log.logListeners = {}
    Log.flushLoop = true

    const flushTick = () =>
      setTimeout(async () => {
        try {
          await Log.flushData()
        } catch (e) {
          console.warn('[the-db]Failed to flush log data', e)
        }
        if (Log.flushLoop) {
          Log.flushTimer = flushTick()
        }
      }, 500).unref()

    if (cluster.isMaster) {
      Log.flushTimer = flushTick()
    }
  }

  addRef(resourceName, resource) {
    const Log = this
    super.addRef.call(Log, resourceName, resource)
    const isMetaSchema = /^TheDB/.test(resourceName)
    if (!isMetaSchema) {
      Log.startListeningFor(resourceName)
    }
  }

  pushLog(resourceName, entityId, attributes) {
    const Log = this

    Log.data[resourceName] = Log.data[resourceName] || {}
    Log.data[resourceName][String(entityId)] = Object.assign(
      Log.data[resourceName][String(entityId)] || {},
      attributes,
    )

    // Flush Logs if needed
    {
      const WATERMARK = 100
      const counts = Object.keys(Log.data[resourceName]).length
      const needsFlush = WATERMARK <= counts && counts % WATERMARK === 0
      if (needsFlush) {
        void this.flushData()
      }
    }
  }

  removeRef(resourceName) {
    const Log = this
    super.removeRef.call(Log, resourceName)
    Log.stopListeningFor(resourceName)
  }

  startListeningFor(resourceName) {
    const Log = this
    const resource = Log.getRef(resourceName)

    const logListeners = {
      [ENTITY_CREATE]: ({ created }) =>
        Log.pushLog(resourceName, created.id, { entityCreatedAt: new Date() }),
      [ENTITY_CREATE_BULK]: ({ created }) =>
        created.map((created) =>
          Log.pushLog(resourceName, created.id, {
            entityCreatedAt: new Date(),
          }),
        ),
      [ENTITY_DESTROY]: ({ id }) =>
        Log.pushLog(resourceName, id, { entityDestroyedAt: new Date() }),
      [ENTITY_DESTROY_BULK]: ({ ids }) =>
        ids.map((id) =>
          Log.pushLog(resourceName, id, { entityDestroyedAt: new Date() }),
        ),
      [ENTITY_UPDATE]: ({ id }) =>
        Log.pushLog(resourceName, id, { entityUpdatedAt: new Date() }),
      [ENTITY_UPDATE_BULK]: ({ ids }) =>
        ids.map((id) =>
          Log.pushLog(resourceName, id, { entityUpdatedAt: new Date() }),
        ),
    }
    Log.logListeners[resourceName] = logListeners

    for (const [event, listener] of Object.entries(logListeners)) {
      resource.addListener(event, listener)
    }
  }

  stopListeningFor(resourceName) {
    const Log = this
    const resource = Log.getRef(resourceName)

    const logListeners = Log.logListeners[resourceName]
    for (const [event, listener] of Object.entries(logListeners)) {
      resource.removeListener(event, listener)
    }
    delete Log.logListeners[resourceName]
  }

  async close() {
    const Log = this
    Log.flushLoop = false
    clearTimeout(Log.flushTimer)
    if (cluster.isMaster) {
      await Log.flushData().catch(() => null)
    }
    for (const resourceName of Object.keys(Log.logListeners)) {
      Log.stopListeningFor(resourceName)
    }

    super.close.call(Log, ...arguments)
  }

  async flushData() {
    const Log = this
    const { theDBLogEnabled } = Log.db || {}
    if (!theDBLogEnabled) {
      return
    }
    const { dialect } = (Log.db && Log.db.env) || {}
    if (String(dialect).trim() === 'memory') {
      return
    }
    if (Log._flushTask) {
      await Log._flushTask
    }
    Log._flushTask = (async () => {
      await amkdirp(path.dirname(Log.filename))
      for (const resourceName of Object.keys(Log.data)) {
        const entries = Object.entries(Log.data[resourceName])
        Log.data[resourceName] = {}
        if (entries.length === 0) {
          continue
        }
        const lines = entries
          .map(([entityId, attributes]) =>
            JSON.stringify([resourceName, entityId, attributes]),
          )
          .join(EOL)

        try {
          await new Promise((resolve, reject) =>
            fs.appendFile(Log.filename, lines + EOL, (err) =>
              err ? reject(err) : resolve(),
            ),
          )
        } catch (e) {
          console.warn(`[the-db]Failed to flush log for "${resourceName}"`)
          return
        }
      }
      Log._flushTask = null
    })()
    await Log._flushTask
  }
}

module.exports = TheLogResource
