'use strict'

const ababel = require('ababel')
const aglob = require('aglob')
const { isProduction } = require('asenv')
const {
  mkdirpAsync,
  readFileAsync,
  statAsync,
  writeFileAsync,
} = require('asfs')
const filecopy = require('filecopy')
const lebab = require('lebab')
const path = require('path')
const mtime = (filename) =>
  statAsync(filename)
    .catch(() => null)
    .then((stat) => stat && stat.mtime)

const _tmpl = (filename) =>
  path.resolve(`${__dirname}/../../assets/tmpl`, filename)

module.exports = async function buildESM(
  srcDir,
  destDir,
  { jsPattern, plugins },
) {
  const ignore = [`${path.relative(srcDir, destDir)}/**/*.*`]
  const filenames = await aglob(jsPattern, {
    cwd: srcDir,
    ignore,
  })
  for (const filename of filenames) {
    const src = path.resolve(srcDir, filename)
    const dest = path.resolve(destDir, filename).replace(/\.jsx$/, '.js')

    if (!isProduction()) {
      const srcMtime = await mtime(src)
      const destMtime = await mtime(dest)
      const skip = Boolean(srcMtime && destMtime && srcMtime <= destMtime)
      if (skip) {
        continue
      }
    }

    try {
      const srcContent = String(await readFileAsync(src))
      const { code } = lebab.transform(srcContent, ['commonjs'])
      await mkdirpAsync(path.dirname(dest))
      await writeFileAsync(
        dest,
        code
          .replace(/export var default = void 0;/, '')
          .replace(/export var default = exports\..* = void 0;/, ''),
      )
    } catch (e) {
      console.warn('[the-script-build] Failed to lebab:', src)
    }
  }
  await ababel(jsPattern, {
    cwd: destDir,
    out: destDir,
    plugins,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      ['@babel/preset-react', {}],
    ],
  })

  {
    const filenames = await aglob('**/*.json', {
      cwd: srcDir,
      ignore,
    })
    for (const filename of filenames) {
      const src = path.resolve(srcDir, filename)
      const dest = path.resolve(destDir, filename)
      await filecopy(src, dest, { mkdirp: true })
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
