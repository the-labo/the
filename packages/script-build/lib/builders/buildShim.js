'use strict'

const ababel = require('ababel')
const aglob = require('aglob')
const filecopy = require('filecopy')
const path = require('path')

module.exports = async function buildShim(
  srcDir,
  destDir,
  { jsPattern, plugins, presets },
) {
  await ababel(jsPattern, {
    cwd: srcDir,
    out: destDir,
    plugins,
    presets,
  })

  // Copy json files
  {
    for (const filename of await aglob('**/*.json', { cwd: srcDir })) {
      const src = path.resolve(srcDir, filename)
      await filecopy(src, path.resolve(destDir, filename), { mkdirp: true })
    }
  }
}
