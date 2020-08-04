'use strict'

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
const mkdirp = require('mkdirp')
const { EOL } = require('os')
const path = require('path')
const rfs = require('rotating-file-stream')

const logStreamFor = (filename) => {
  const basename = path.basename(filename)
  return rfs.createStream(
    (time, index) => {
      if (!time) {
        return basename
      }

      const pad = (v) => String(v).padStart(2, '0')
      const yearAndMonth = `${time.getFullYear()}${pad(time.getMonth() + 1)}`
      const day = pad(time.getDate())
      const hour = pad(time.getHours())
      const minute = pad(time.getMinutes())
      return `${yearAndMonth}/${yearAndMonth}${day}-${hour}${minute}-${basename}-${index}.gzip`
    },
    {
      compress: 'gzip',
      interval: '1d',
      path: path.dirname(filename),
      size: '10MB',
    },
  )
}

/**
 * Resource of data history
 * @memberof module:@the-/db
 * @class TheLogResource
 */
const TheLogResource = ({ define }) => {
  const Log = define({})
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

  const { addRef, close, removeRef } = Log
  Object.assign(Log, {
    addRef(resourceName, resource) {
      addRef.call(Log, resourceName, resource)
      const isMetaSchema = /^TheDB/.test(resourceName)
      if (!isMetaSchema) {
        Log.startListeningFor(resourceName)
      }
    },
    prepare({ filename }) {
      Log.filename = filename
      const stream = logStreamFor(filename)
      stream.on('error', (err) => {
        console.warn(`[@the-/db]Failed to flush log for "${filename}"`, err)
      })
      Log.stream = stream
      process.setMaxListeners(process.getMaxListeners() + 1)
      process.on('beforeExit', () => {
        stream.end()
      })
    },
    pushLog(resourceName, entityId, attributes) {
      Log.data[resourceName] = Log.data[resourceName] || {}
      Log.data[resourceName][String(entityId)] = Object.assign(
        Log.data[resourceName][String(entityId)] || {},
        attributes,
      )

      // Flush Logs if needed
      {
        const WATERMARK = 100
        const { length: counts } = Object.keys(Log.data[resourceName])
        const needsFlush = WATERMARK <= counts && counts % WATERMARK === 0
        if (needsFlush) {
          void Log.flushData()
        }
      }
    },
    removeRef(resourceName) {
      removeRef.call(Log, resourceName)
      Log.stopListeningFor(resourceName)
    },
    startListeningFor(resourceName) {
      const resource = Log.getRef(resourceName)

      const logListeners = {
        [ENTITY_CREATE]: ({ created }) =>
          Log.pushLog(resourceName, created.id, {
            createdAt: new Date(),
          }),
        [ENTITY_CREATE_BULK]: ({ created }) =>
          created.map((created) =>
            Log.pushLog(resourceName, created.id, {
              createdAt: new Date(),
            }),
          ),
        [ENTITY_DESTROY]: ({ id }) =>
          Log.pushLog(resourceName, id, { destroyedAt: new Date() }),
        [ENTITY_DESTROY_BULK]: ({ ids }) =>
          ids.map((id) =>
            Log.pushLog(resourceName, id, { destroyedAt: new Date() }),
          ),
        [ENTITY_UPDATE]: ({ id }) =>
          Log.pushLog(resourceName, id, { updatedAt: new Date() }),
        [ENTITY_UPDATE_BULK]: ({ ids }) =>
          ids.map((id) =>
            Log.pushLog(resourceName, id, { updatedAt: new Date() }),
          ),
      }
      Log.logListeners[resourceName] = logListeners

      for (const [event, listener] of Object.entries(logListeners)) {
        resource.addListener(event, listener)
        resource.setMaxListeners(resource.getMaxListeners() + 1)
      }
    },
    stopListeningFor(resourceName) {
      const resource = Log.getRef(resourceName)

      const logListeners = Log.logListeners[resourceName]
      for (const [event, listener] of Object.entries(logListeners)) {
        resource.removeListener(event, listener)
        resource.setMaxListeners(resource.getMaxListeners() - 1)
      }
      delete Log.logListeners[resourceName]
    },
    async close() {
      Log.flushLoop = false
      clearTimeout(Log.flushTimer)
      if (cluster.isMaster) {
        await Log.flushData().catch(() => null)
      }

      for (const resourceName of Object.keys(Log.logListeners)) {
        Log.stopListeningFor(resourceName)
      }

      close.call(Log, ...arguments)
    },
    async flushData() {
      const { stream } = Log
      const { theDBResourceLogEnabled } = Log.db || {}
      if (!theDBResourceLogEnabled) {
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
        await mkdirp(path.dirname(Log.filename))
        for (const resourceName of Object.keys(Log.data)) {
          const entries = Object.entries(Log.data[resourceName])
          Log.data[resourceName] = {}
          if (entries.length === 0) {
            continue
          }

          const lines = entries
            .map(([entityId, attributes]) =>
              [
                `${resourceName}#${entityId}`,
                Object.entries(attributes)
                  .map(([k, v]) => [k, JSON.stringify(v)].join('='))
                  .join(','),
              ].join(' '),
            )
            .join(EOL)

          stream.write(lines + EOL)
        }
        Log._flushTask = null
      })()
      await Log._flushTask
    },
  })
  return Log
}

module.exports = TheLogResource
