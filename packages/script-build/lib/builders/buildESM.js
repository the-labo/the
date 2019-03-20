'use strict'

const ababel = require('ababel')
const aglob = require('aglob')
const {
  mkdirpAsync,
  readFileAsync,
  statAsync,
  writeFileAsync,
} = require('asfs')
const filecopy = require('filecopy')
const lebab = require('lebab')
const path = require('path')

const _tmpl = (filename) =>
  path.resolve(`${__dirname}/../assets/tmpl`, filename)

module.exports = async function buildESM(
  srcDir,
  destDir,
  { jsPattern, plugins },
) {
  for (const filename of await aglob(jsPattern, { cwd: srcDir })) {
    const src = path.resolve(srcDir, filename)
    const dest = path.resolve(destDir, filename).replace(/\.jsx$/, '.js')
    try {
      const { code } = lebab.transform(String(await readFileAsync(src)), [
        'commonjs',
      ])
      await mkdirpAsync(path.dirname(dest))
      await writeFileAsync(dest, code)
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

  for (const filename of await aglob('**/*.json', { cwd: srcDir })) {
    const src = path.resolve(srcDir, filename)
    const dest = path.resolve(destDir, filename)
    await filecopy(src, dest, { mkdirp: true })
  }

  const hasDefault = !!(await statAsync(
    path.resolve(srcDir, 'default.js'),
  ).catch(() => null))
  await filecopy(
    hasDefault ? _tmpl('indexWithDefault.mjs') : _tmpl('index.mjs'),
    path.resolve(destDir, 'index.mjs'),
  )
}
