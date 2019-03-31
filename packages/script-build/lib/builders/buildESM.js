'use strict'

const aglob = require('aglob')
const { readFileAsync, statAsync } = require('asfs')
const filecopy = require('filecopy')
const lebab = require('lebab')
const path = require('path')
const writeout = require('writeout')
const buildShim = require('./buildShim')

const _tmpl = (filename) =>
  path.resolve(`${__dirname}/../../assets/tmpl`, filename)

module.exports = async function buildESM(
  srcDir,
  destDir,
  { jsPattern, plugins, presets },
) {
  await buildShim(srcDir, destDir, { jsPattern, plugins, presets })
  const filenames = await aglob(jsPattern, {
    cwd: destDir,
  })
  for (const filename of filenames) {
    const resolved = path.resolve(destDir, filename)
    try {
      const srcContent = String(await readFileAsync(resolved))
      const { code } = lebab.transform(srcContent, ['commonjs'])
      const { skipped } = await writeout(resolved, code, {
        skipIfIdentical: true,
      })
      if (!skipped) {
        console.log('File generated', path.relative(process.cwd(), resolved))
      }
    } catch (e) {
      console.warn('[the-script-build] Failed to lebab:', resolved, e)
    }
  }
  const hasDefault = !!(await statAsync(
    path.resolve(srcDir, 'default.js'),
  ).catch(() => null))
  await filecopy(
    hasDefault ? _tmpl('indexWithDefault.mjs') : _tmpl('index.mjs'),
    path.resolve(destDir, '../index.mjs'),
  )
}
