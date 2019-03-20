/**
 * Build project
 * @function build
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const argx = require('argx')
const { existsAsync } = require('asfs')
const asleep = require('asleep')
const awatch = require('awatch')
const coz = require('coz')
const path = require('path')
const theCode = require('the-code')
const fixpack = require('@okunishinishi/fixpack')
const buildDemo = require('./builders/buildDemo')
const buildESM = require('./builders/buildESM')
const buildShim = require('./builders/buildShim')

/** @lends build */
async function build(dirname = process.cwd(), options = {}) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()
  const {
    budPattern = ['.*.bud', '+(bin|ci|doc|example|lib|misc|test)/**/.*.bud'],
    demoDest = 'doc/demo/bundle.js',
    demoSrc = 'doc/demo/entrypoint.jsx',
    jsPattern = '**/+(*.jsx|*.js)',
    libDir = 'lib',
    shimDir = 'shim',
    watch = false,
    watchTriggerInterval = 100,
  } = options

  const pkgPath = path.resolve(dirname, 'package.json')
  const esmShimDir = shimDir + '/esm'

  fixpack(pkgPath)
  const pkg = require(pkgPath)

  const presets = [['@babel/preset-env', {}], ['@babel/preset-react', {}]]
  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-do-expressions'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-transform-runtime', {}, 'the-script-build-runtime'],
  ]
  const buildBud = async () => coz.render(budPattern)
  const buildJs = async () => {
    await theCode().format(path.join(libDir, '**/*.*'), {
      ignore: ['**/index.*'],
    })

    await buildShim(libDir, shimDir, {
      jsPattern,
      plugins,
      presets,
    })

    // Generate esm shim
    await buildESM(libDir, esmShimDir, {
      jsPattern,
      plugins,
    })
  }

  const cwd = process.cwd()
  process.chdir(dirname)

  const demoExists = await existsAsync(demoSrc)
  await buildJs()
  await buildBud()

  const demo = async () =>
    buildDemo(demoSrc, demoDest, {
      alias: { [pkg.name]: path.resolve(dirname, shimDir) },
      plugins,
      presets,
    })
  if (demoExists) {
    await demo()
  }

  if (watch) {
    let needsBuildJs = false
    let needsBuildBud = false
    await awatch(budPattern, () => {
      needsBuildBud = true
    })
    await awatch(
      jsPattern,
      () => {
        needsBuildJs = true
      },
      { cwd: libDir },
    )
    while (watch) {
      if (needsBuildBud) {
        needsBuildBud = false
        const nameToDecache = Object.keys(require.cache).filter((filename) =>
          /bud$/.test(filename),
        )
        for (const name of nameToDecache) {
          delete require.cache[name]
        }
        await buildBud()
      }
      if (needsBuildJs) {
        needsBuildJs = false
        await buildJs()
        if (demoExists) {
          await demo()
        }
      }
      await asleep(watchTriggerInterval)
    }
  }

  process.chdir(cwd)
}

module.exports = build
