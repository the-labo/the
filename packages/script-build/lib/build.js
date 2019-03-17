/**
 * Build project
 * @function build
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const ababel = require('ababel')
const aglob = require('aglob')
const argx = require('argx')
const {
  mkdirpAsync,
  readFileAsync,
  statAsync,
  writeFileAsync,
} = require('asfs')
const { existsAsync } = require('asfs')
const asleep = require('asleep')
const awatch = require('awatch')
const coz = require('coz')
const filecopy = require('filecopy')
const lebab = require('lebab')
const path = require('path')
const theCode = require('the-code')
const webpack = require('webpack')
const fixpack = require('@okunishinishi/fixpack')

const _tmpl = (filename) =>
  path.resolve(`${__dirname}/../assets/tmpl`, filename)

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
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-do-expressions'],
    ['@babel/plugin-transform-runtime', {}, 'the-script-build-runtime'],
  ]
  const buildBud = async () => coz.render(budPattern)
  const buildJs = async () => {
    await theCode().format(path.join(libDir, '**/*.*'), {
      ignore: ['**/index.*'],
    })
    await ababel(jsPattern, {
      cwd: libDir,
      out: shimDir,
      plugins,
      presets,
    })

    // Generate esm shim
    {
      for (const filename of await aglob('**/+(*.js|*.jsx)', { cwd: libDir })) {
        const src = path.resolve(libDir, filename)
        const dest = path.resolve(esmShimDir, filename).replace(/\.jsx$/, '.js')
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
        cwd: esmShimDir,
        out: esmShimDir,
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
    }

    // Copy json files
    {
      for (const filename of await aglob('**/*.json', { cwd: libDir })) {
        const src = path.resolve(libDir, filename)
        await filecopy(src, path.resolve(shimDir, filename), { mkdirp: true })
        await filecopy(src, path.resolve(esmShimDir, filename), {
          mkdirp: true,
        })
      }
    }

    {
      const hasDefault = !!(await statAsync(
        path.resolve(libDir, 'default.js'),
      ).catch(() => null))
      await filecopy(
        hasDefault ? _tmpl('indexWithDefault.mjs') : _tmpl('index.mjs'),
        path.resolve(shimDir, 'index.mjs'),
      )
    }
  }

  const buildDemo = async () => {
    const src = path.resolve(demoSrc)
    const dest = path.resolve(demoDest)
    const compiler = webpack({
      devtool: 'eval-source-map',
      entry: src,
      mode: 'development',
      module: {
        rules: [
          {
            exclude: /(node_modules|bower_components)/,
            test: /\.m?jsx?$/,
            use: {
              loader: require.resolve('babel-loader'),
              options: {
                plugins,
                presets,
              },
            },
          },
        ],
      },
      output: {
        filename: path.basename(demoDest),
        path: path.dirname(dest),
      },
      resolve: {
        alias: {
          [pkg.name]: path.resolve(dirname, shimDir),
        },
      },
    })
    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(err)
          return
        }
        const hasErrors = stats.hasErrors()
        if (hasErrors) {
          const { errors } = stats.toJson()
          console.error(errors)
          reject(errors[0])
          return
        }
        resolve()
      })
    })
  }
  const cwd = process.cwd()
  process.chdir(dirname)

  const demoExists = await existsAsync(demoSrc)
  await buildJs()
  await buildBud()
  if (demoExists) {
    await buildDemo()
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
        let nameToDecache = Object.keys(require.cache).filter((filename) =>
          /bud$/.test(filename),
        )
        for (let name of nameToDecache) {
          delete require.cache[name]
        }
        await buildBud()
      }
      if (needsBuildJs) {
        needsBuildJs = false
        await buildJs()
        if (demoExists) {
          await buildDemo()
        }
      }
      await asleep(watchTriggerInterval)
    }
  }

  process.chdir(cwd)
}

module.exports = build
