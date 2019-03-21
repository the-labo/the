/**
 * @class TheRefactor
 */
'use strict'

const abind = require('abind')
const aglob = require('aglob')
const {
  mkdirpAsync,
  readFileAsync,
  renameAsync,
  statAsync,
  writeFileAsync,
} = require('asfs')
const filecopy = require('filecopy')
const path = require('path')

const _relativePath = (pathname) => path.relative(process.cwd(), pathname)
const _restoreRegExp = (v) =>
  /^\/.*\/$/.test(v) ? new RegExp(v.replace(/^\/|\/$/g, '')) : v
const _replace = (content, from, to, { filename, max } = {}) => {
  for (let i = 0; i < max; i++) {
    const replaced = content.replace(from, to)
    const unchanged = content === replaced
    if (unchanged) {
      return content
    }
    content = replaced
  }
  throw new Error(
    `[TheRefactor] Too many replace. (May be looping) ${JSON.stringify(
      filename,
      from,
      to,
    )}`,
  )
}

/** @lends TheRefactor */
class TheRefactor {
  constructor() {
    abind(this)
  }

  /**
   * Process with convert function
   * @param {string} pattern - Filename pattern
   * @param {function} converter
   * @returns {Promise<void>}
   */
  async convert(pattern, converter) {
    return this._each(pattern, ({ content }) => {
      return {
        content: converter(content),
      }
    })
  }

  /**
   * Rename files
   * @param {string} pattern - Source file name patterns
   * @param {function} convert - Converter
   * @returns {Promise<void>}
   */
  async rename(pattern, convert) {
    return this._each(pattern, ({ filename }) => {
      const dirname = path.dirname(filename)
      const extname = path.extname(filename)
      const basename = path.basename(filename, extname)
      const changed = {
        basename,
        dirname,
        extname,
        ...convert({ basename, dirname, extname }),
      }
      return {
        filename: path.join(
          changed.dirname,
          changed.basename + changed.extname,
        ),
      }
    })
  }

  /**
   * Rename directory
   * @param {string} src - Directory rename from
   * @param {string} dest - Directory rename to
   * @returns {Promise<void>}
   */
  async renameDir(src, dest) {
    const srcExists = !!(await statAsync(src).catch(() => null))
    if (!srcExists) {
      return
    }
    const destExists = !!(await statAsync(dest).catch(() => null))
    if (destExists) {
      await this.rename(path.join(src, '**/*.*'), () => ({ dirname: dest }))
      await this.rename(path.join(src, '**/.*'), () => ({ dirname: dest }))
      await this.rename(path.join(src, '**/.*.*'), () => ({ dirname: dest }))
    } else {
      await mkdirpAsync(path.dirname(dest))
      await renameAsync(src, dest)
      console.log(
        `[the-refactor] Directory renamed: "${_relativePath(
          src,
        )}" -> "${_relativePath(dest)}"`,
      )
    }
  }

  /**
   * Rewrite file content
   * @param {string} pattern - Filename pattern
   * @param {object} rules - Replace rules
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<void>}
   */
  async rewrite(pattern, rules, options = {}) {
    const { max = 100 } = options

    return this._each(pattern, ({ content, filename }) => {
      for (const [from, to] of Object.entries(rules)) {
        content = _replace(content, _restoreRegExp(from), to, { filename, max })
      }
      return { content }
    })
  }

  /**
   * Scatter a file to directories
   * @param {string} src
   * @param {string[]} dirnames
   * @returns {Promise<void>}
   */
  async scatter(src, dirnames) {
    for (const dirname of [].concat(dirnames)) {
      const dest = path.join(dirname, path.basename(src))
      const result = await filecopy(src, dest, {
        mkdirp: true,
      })
      for (const [filename, done] of Object.entries(result)) {
        if (done) {
          console.log(
            `[the-refactor] Directory scatter: "${_relativePath(
              src,
            )}" -> "${_relativePath(dest)}"`,
          )
        }
      }
    }
  }

  async _each(pattern, task) {
    const filenames = await aglob(pattern)
    const results = {}
    for (const filename of filenames) {
      const stat = await statAsync(filename).catch(() => null)
      if (!stat) {
        continue
      }
      if (stat.isDirectory()) {
        continue
      }
      const content = await readFileAsync(filename).catch(() => null)
      if (content === null) {
        console.warn(`[TheRefactor] Failed to read: ${filename}`)
        continue
      }
      const before = { content: String(content), filename }
      const after = await task(before)
      for (const key of Object.keys(after)) {
        const changed = before[key] !== after[key]
        if (changed) {
          switch (key) {
            case 'content':
              try {
                await mkdirpAsync(path.dirname(filename))
                await writeFileAsync(filename, after[key])
                console.log(
                  `[the-refactor] File updated: ${_relativePath(filename)}`,
                )
              } catch (e) {
                console.warn(
                  `[the-refactor] Failed to update ${_relativePath(filename)}`,
                  e.message,
                )
              }
              break
            case 'filename': {
              const dest = after[key]
              await mkdirpAsync(path.dirname(dest))
              await renameAsync(filename, dest)
              console.log(
                `[the-refactor] File moved: ${_relativePath(
                  filename,
                )} -> ${_relativePath(dest)}`,
              )
              break
            }
          }
        }
        results[filename] = after
      }
    }
    return results
  }
}

module.exports = TheRefactor
