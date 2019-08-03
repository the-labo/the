'use strict'

/**
 * @memberof module:@the-/refactor
 * @class TheRefactor
 */
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
const stringcase = require('stringcase')

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

/** @lends module:@the-/refactor.TheRefactor */
class TheRefactor {
  constructor() {
    abind(this)
  }

  /**
   * Process with convert function
   * @param {string} pattern - Filename pattern
   * @param {Function} converter
   * @param {Object} [options={}]
   * @returns {Promise<undefined>}
   */
  async convert(pattern, converter, options = {}) {
    const { cwd, ignore } = options
    return this._each(
      pattern,
      ({ content, filename }) => ({
        content: converter(content, { filename }) || content,
      }),
      { cwd, ignore },
    )
  }

  /**
   * Process files to rename
   * @param {string|string[]} pattern - Patterns to process
   * @param {string} from - From text
   * @param {string} to - TO text
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<undefined>}
   */
  async process(pattern, from, to, options = {}) {
    const { cwd } = options
    const rules = [
      stringcase.camelcase,
      stringcase.enumcase,
      stringcase.pascalcase,
      stringcase.capitalcase,
      stringcase.spinalcase,
      stringcase.snakecase,
      stringcase.spinalcase,
      stringcase.pathcase,
      stringcase.uppercase,
      stringcase.lowercase,
      stringcase.dotcase,
    ].reduce(
      (rules, c) => ({
        ...rules,
        [c(from)]: c(to),
      }),
      { [from]: to },
    )
    const convert = (v) =>
      Object.entries(rules).reduce((v, [from, to]) => v.replace(from, to), v)
    await this.rewrite(pattern, rules, { cwd })
    await this.rename(
      pattern,
      ({ basename, dirname }) => ({
        basename: convert(basename),
        dirname: convert(dirname),
      }),
      { cwd },
    )
  }

  /**
   * Rename files
   * @param {string} pattern - Source file name patterns
   * @param {Function} convert - Converter
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<undefined>}
   */
  async rename(pattern, convert, options = {}) {
    const { cwd, ignore } = options
    return this._each(
      pattern,
      ({ filename }) => {
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
      },
      { cwd, ignore },
    )
  }

  /**
   * Rename directory
   * @param {string} src - Directory rename from
   * @param {string} dest - Directory rename to
   * @returns {Promise<undefined>}
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
   * @param {string|string[]} pattern - Filename pattern
   * @param {Object} rules - Replace rules
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<undefined>}
   */
  async rewrite(pattern, rules, options = {}) {
    const { cwd, ignore, max = 100 } = options

    return this._each(
      pattern,
      ({ content, filename }) => {
        for (const [from, to] of Object.entries(rules)) {
          content = _replace(content, _restoreRegExp(from), to, {
            filename,
            max,
          })
        }
        return { content }
      },
      { cwd, ignore },
    )
  }

  /**
   * Scatter a file to directories
   * @deprecated
   * @param {string} src
   * @param {string[]} dirnames
   * @returns {Promise<undefined>}
   */
  async scatter(src, dirnames) {
    for (const dirname of [].concat(dirnames)) {
      const dest = path.join(dirname, path.basename(src))
      const result = await filecopy(src, dest, {
        mkdirp: true,
      })
      for (const [, done] of Object.entries(result)) {
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

  async _each(pattern, task, options = {}) {
    const { cwd = process.cwd(), ignore = [] } = options
    const filenames = await aglob(pattern, { cwd, ignore })
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
