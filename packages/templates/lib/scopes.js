'use strict'

const aglob = require('aglob')
const path = require('path')
const { camelcase } = require('stringcase')
const _tmpl = require('./_tmpl')

const handleRestConfig = (rest) => {
  const restKeys = Object.keys(rest)
  if (restKeys.length > 0) {
    console.warn(`[the-templates][scopes] Unknown configs: ${restKeys}`)
  }
}
const withoutExt = (filename) =>
  path.join(
    path.dirname(filename),
    path.basename(filename, path.extname(filename)),
  )
const compareByLength = (a, b) => a.length - b.length

/**
 * @memberof module:@the-/templates
 * @function scopes
 * @param config
 * @returns {*}
 */
function scopes(config) {
  const { dirname, memberof = 'store', pattern = '**/*.json', ...rest } = config
  handleRestConfig(rest)
  const filenames = aglob.sync(pattern, { cwd: dirname })
  const modules = Object.assign(
    {},
    ...filenames.map((filename) => ({
      [withoutExt(filename).replace(/\//g, '.')]: {
        json: path.extname(filename) === '.json',
        namespace: false,
        path: `./${filename}`,
        varName: `${camelcase(withoutExt(filename).replace(/\//g, '_'))}_`,
      },
    })),
  )

  for (const key of Object.keys(modules).sort(compareByLength)) {
    const keypaths = key.split(/\./g)
    for (let i = 0; i < keypaths.length - 1; i++) {
      const keypath = keypaths.slice(0, i + 1).join('.')
      if (!modules[keypath]) {
        modules[keypath] = {
          namespace: true,
          path: keypath.replace(/\./g, '/'),
        }
      }
    }
  }
  return {
    data: {
      memberof,
      modules: Object.keys(modules)
        .sort((a, b) => a.localeCompare(b))
        .map((k) => ({
          name: k,
          sub: /\./.test(k),
          ...modules[k],
        })),
    },
    force: true,
    mode: '444',
    path: `${dirname}/index.js`,
    tmpl: _tmpl('scopes.hbs'),
  }
}

module.exports = scopes
