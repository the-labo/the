'use strict'

/**
 * Read file as array buffer
 * @memberof module:@the-/util-client
 * @function readFile
 * @param {File} file - File to read
 * @returns {Promise<ArrayBuffer>} - Array buffer
 */
const { get } = require('@the-/window')

/** @lends module:@the-/util-client.1readFile */
async function readFile(file) {
  const FileReader = get('window.FileReader')
  if (!FileReader) {
    console.warn('[the-client-util] FileReader is not supported')
    return null
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(file)
  })
}

Object.assign(readFile, {
  async *asChunkGenerator(file, options = {}) {
    const { asBlob = false, chunkSize = 256 * 1024 } = options
    for (let i = 0; i < file.size; i += chunkSize) {
      const sliced = file.slice(i, i + chunkSize)
      if (asBlob) {
        yield sliced
      } else {
        const buffer = await readFile(sliced)
        yield buffer
      }
    }
  },
})

module.exports = readFile
