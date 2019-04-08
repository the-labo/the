/**
 * Add export/import methods
 * @function exportImportMix
 * @param {function}
 * @returns {function}
 */
'use strict'

const amkdirp = require('amkdirp')
const asleep = require('asleep')
const aslogger = require('aslogger')
const { deserialize, serialize } = require('clay-serial')
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const readline = require('readline')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const appendFileAsync = promisify(fs.appendFile)
const statAsync = promisify(fs.stat)
const { decode, encode } = require('msgpack5')()
const INFO_FILE_NAME = 'info.json'

/** @lends exportImportMix */
function exportImportMix(Class) {
  /** @class ExportImportMixed */
  class ExportImportMixed extends Class {
    async export(dirname) {
      const logger = aslogger({})
      await amkdirp(dirname)
      const infoFilePath = path.join(dirname, INFO_FILE_NAME)
      const { resources } = this
      const resourcesInfo = {}
      for (const [rName, resource] of Object.entries(resources || {})) {
        const skip = ['TheDBLog'].includes(rName)
        if (skip) {
          continue
        }
        const filename = path.join(dirname, rName + '.dat')
        await writeFileAsync(filename, '')
        logger.point(`Exporting "${rName}"...`)

        const length = await resource.count()
        const size = 100
        for (let number = 1; number < 2 + length / size; number++) {
          const { entities } = await resource.list({
            page: { number, size },
          })
          for (const entity of entities) {
            const id = String(entity.id)
            const attributes = Object.assign({}, entity)
            delete attributes.id
            const line = encode({
              attributes: serialize.all(attributes),
              id,
            }).toString('hex')
            await appendFileAsync(filename, line + EOL)
          }
        }
        resourcesInfo[rName] = {
          at: new Date(),
          filename,
          length,
          resource: rName,
        }
        logger.debug('File exported ', path.relative(process.cwd(), filename))
      }
      const info = {
        exportedAt: new Date(),
        resources: resourcesInfo,
      }
      await writeFileAsync(infoFilePath, JSON.stringify(info, null, 2))
      await asleep(10) // Wait to flush
    }

    async import(dirname) {
      const logger = aslogger({})
      const infoFilePath = path.join(dirname, INFO_FILE_NAME)
      const hasInfo = !!(await statAsync(infoFilePath).catch(() => null))
      if (!hasInfo) {
        throw new Error(`[TheDB] No info found: ${dirname}`)
      }
      const info = JSON.parse(String(await readFileAsync(infoFilePath)))

      const { resources: resourcesInfo } = info
      for (const [rName, rInfo] of Object.entries(resourcesInfo)) {
        const resource = this.resource(rName)
        logger.point(`Importing "${rName}"...`)
        const { filename } = rInfo
        let work = null
        const importEntities = async (lines) => {
          const decodedLines = lines.map((line) =>
            decode(Buffer.from(line, 'hex')),
          )
          const knowns = []
          const unknowns = []
          for (let { attributes, id } of decodedLines) {
            attributes = deserialize.all(attributes)
            const known = await resource.one(id)
            if (known) {
              knowns.push({ attributes, id, known })
            } else {
              unknowns.push({ id, ...attributes })
            }
          }
          const newers = knowns.filter(
            ({ attributes, known }) =>
              new Date(known.$$at) < new Date(attributes.$$at),
          )
          if (newers.length > 0) {
            const attributesHash = newers.recude(
              (hash, { attributes, id }) => ({ ...hash, [id]: attributes }),
              {},
            )
            await resource.updateBulk(attributesHash, { allowReserved: true })
          }
          if (unknowns.length > 0) {
            await resource.createBulk(unknowns, { allowReserved: true })
          }
        }
        await new Promise((resolve, reject) => {
          const reader = readline.createInterface({
            input: fs.createReadStream(filename),
          })
          let lines = []
          reader.on('line', (line) => {
            if (lines.length < 100) {
              lines.push(line)
              return
            }
            const importing = [...lines, line]
            lines = []
            work = Promise.resolve(work).then(async () => {
              await importEntities(importing)
            })
          })
          reader.on('close', () => {
            const importing = [...lines]
            work = Promise.resolve(work).then(async () => {
              await importEntities(importing)
              resolve()
            })
          })
          reader.on('error', (err) => reject(err))
        })
        await work
      }
      await asleep(10) // Wait to flush
    }
  }

  return ExportImportMixed
}

module.exports = exportImportMix
