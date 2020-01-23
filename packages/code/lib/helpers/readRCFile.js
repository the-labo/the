'use strict'

const { readAsJson, readAsYaml } = require('@the-/util-file')

async function readRCFile(filename) {
  if (!filename) {
    return null
  }

  for (const reader of [readAsYaml, readAsJson]) {
    try {
      const content = await reader(filename)
      return {
        rules: {},
        ...content,
      }
    } catch (e) {
      // do nothing
    }
  }
  return {}
}

module.exports = readRCFile
