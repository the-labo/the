'use strict'

const { readAsYaml, readAsJson } = require('@the-/util-file')

async function readRCFile (filename) {
  if (!filename) {
    return null
  }
  for (const reader of [readAsYaml, readAsJson]) {
    try {
      const content = await readAsYaml(filename)
      return {
        rules: {},
        ...content,
      }
    } catch(e){
      // do nothing
    }
  }
  return null
}

module.exports = readRCFile