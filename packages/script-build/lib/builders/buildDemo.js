'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = async function buildDemo(
  demoSrc,
  demoDest,
  { alias, plugins, presets },
) {
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
      alias,
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
