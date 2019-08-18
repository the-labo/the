'use strict'

const argx = require('argx')
const { statAsync } = require('asfs')
const askconfig = require('askconfig')
const filemode = require('filemode')
const gitconfig = require('gitconfig')
const path = require('path')
const injection = require('./data.json')
const listTypes = require('./listTypes')
const render = require('./render')
const tmpls = require('./tmpls.json')

/**
 * @memberof module:@the-/scaffold
 * @function theScaffold
 * @param {string} type - Scaffold type
 * @param {string} dest - Destination directory path
 * @param {Object} options - Optional settings1
 * @param {boolean} [options.straight=false] - No asking.
 * @param {boolean} [options.force=false] - Force to generate scaffold.
 * @param {boolean} [options.silent=false] - Disable logs.
 * @returns {Promise}
 */
async function theScaffold(type, dest, options = {}) {
  const args = argx(arguments)
  type = args.shift('string')
  dest = args.shift('string')
  if (!type) {
    listTypes(tmpls)
    return
  }

  if (!dest) {
    throw new Error('dest is required.')
  }

  const exists = Boolean(await statAsync(dest).catch(() => false))
  const skip = exists && !options.force
  if (skip) {
    throw new Error(`${dest} is already exists. Use -f option to force.`)
  }

  let user = await gitconfig.get('user')
  user = user || { name: '__user_name__' }
  const defaults = Object.assign(
    {
      github_repository: [user.name, path.basename(dest)].join('/'),
      package_description: '',
      package_name: path.basename(dest),
    },
    injection[type] || {},
  )
  let config
  if (options.straight) {
    config = Object.assign(defaults)
  } else {
    config = await askconfig(defaults)
  }

  const data = {
    author_email: user.email,
    author_name: user.name,
    author_url: user.url,
    package_unscoped_name: config.package_name
      .replace(/@/, '')
      .replace(/\//, '-'),
    ...config,
  }

  if (!tmpls[type]) {
    throw new Error(`Unknown type: ${type}`)
  }

  const tmpl = path.resolve(__dirname, '..', tmpls[type])
  await render(tmpl, dest, data, {
    silent: options.silent,
  })
  const bins = path.join(dest, '+(ci|bin)/**/*.*')
  await filemode(bins, '755')
}

module.exports = theScaffold
