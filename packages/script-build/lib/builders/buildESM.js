'use strict'

const aglob = require('aglob')
const { readFileAsync, statAsync } = require('asfs')
const filecopy = require('filecopy')
const lebab = require('lebab')
const path = require('path')
const writeout = require('writeout')
const tmp = require('@the-/tmp')
const buildShim = require('./buildShim')

const _tmpl = (filename) =>
  path.resolve(`${__dirname}/../../assets/tmpl`, filename)

module.exports = async function buildESM(
  srcDir,
  destDir,
  { jsPattern, plugins, presets },
) {
  await tmp.whileDir(async (tmpDir) => {
    const filenames = await aglob(jsPattern, {
      cwd: srcDir,
    })
    for (const filename of filenames) {
      const src = path.resolve(srcDir, filename)
      const dest = path.resolve(tmpDir, filename)
      try {
        const srcContent = String(await readFileAsync(src))
        const { code } = lebab.transform(srcContent, ['commonjs'])
        await writeout(dest, code, {
          mkdirp: true,
          skipIfIdentical: true,
        })
      } catch (e) {
        console.warn('[the-script-build] Failed to lebab:', src, e)
      }
    }
    await buildShim(tmpDir, destDir, { jsPattern, plugins, presets })

    // Copy json files
    for (const filename of await aglob('**/*.json', { cwd: srcDir })) {
      const src = path.resolve(srcDir, filename)
      const dest = path.resolve(destDir, filename)
      await filecopy(src, dest, { mkdirp: true })
    }
  })

  const hasDefault = !!(await statAsync(
    path.resolve(srcDir, 'default.js'),
  ).catch(() => null))
  await filecopy(
    hasDefault ? _tmpl('indexWithDefault.mjs') : _tmpl('index.mjs'),
    path.resolve(destDir, '../index.mjs'),
  )
}
