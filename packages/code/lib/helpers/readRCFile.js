'use strict'

const { readAsYaml } = require('@the-/util-file')

async function readRCFile(filename) {
  const content = await readAsYaml(filename)
  return {
    rules: {},
    ...content,
  }
}

module.exports = readRCFile
