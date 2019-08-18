'use strict'

const aglob = require('aglob')
const { canWriteAsync, readFileAsync, statAsync } = require('asfs')
const { cleanup } = require('asobj')
const colorprint = require('colorprint')
const { EOL } = require('os')
const path = require('path')
const { inspect } = require('util')
const SpellCache = require('./helpers/SpellCache')
const Words = require('./Words')
const { Spellchecker } = require('spellchecker') || {}
const debug = require('debug')('the:spell')

const MB = 1000000
const relativePath = (f) => path.relative(process.cwd(), f)

/**
 * @memberof module:@the-/spell
 * @class TheSpell
 * @param {Object} [config={}] - Spelling config
 */
class TheSpell {
  static logErrorReports(reports) {
    const INDENT = ' '
    colorprint.error(`${reports.length} lint spell errors found`)
    const reportedWords = new Set()
    for (const { filename, message, word, ...options } of reports) {
      if (reportedWords.has(word)) {
        continue
      }

      reportedWords.add(word)
      colorprint.errorDetail(INDENT, `${message} ( ${relativePath(filename)} )`)
      const tracing = Object.entries({
        filename,
        word,
        ...options,
      })
      for (const [key, value] of tracing) {
        colorprint.errorDetail(
          INDENT,
          INDENT,
          `${key.padEnd(8)} : ${inspect(value)}`,
        )
      }
      colorprint.errorDetail('')
      colorprint.errorDetail('')
    }
  }

  constructor(config = {}) {
    const {
      cacheFile = 'node_modules/.cache/the-spell/cache.json',
      maxFileSize = 1.5 * MB,
      maxOccurrence = 3,
      maxWordLength = 24,
      minWordLength = 3,
      words: customWords = [],
    } = config

    this.maxWordLength = maxWordLength
    this.minWordLength = minWordLength
    this.maxFileSize = maxFileSize
    this.maxOccurrence = maxOccurrence
    this.spellChecker = new Spellchecker()
    this.knownWords = new Set()
    this.cache = new SpellCache(cacheFile)
    this.addWords([...Words, ...customWords])
  }

  addWord(word) {
    if (this.knownWords.has(word)) {
      return
    }

    const variations = [word]
    for (const variation of variations) {
      this.spellChecker.add(variation)
      this.knownWords.add(variation)
    }
  }

  addWords(words) {
    for (const word of words) {
      this.addWord(word)
    }
  }

  shouldSkipContent(content) {
    return [
      // TODO support the-spell-enable like  https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
      /\* the-spell-disable \*/i,
    ].some((pattern) => pattern.test(content))
  }

  /**
   * Check files
   * @param {string} pattern - File name patterns
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<Array>}
   */
  async check(pattern, options = {}) {
    const { force, ignore } = options
    const filenames = await aglob(pattern, { ignore })
    const results = await Promise.all(
      filenames.map((filename) => this.checkFile(filename, { force, pattern })),
    )
    return [].concat(...results.filter(Boolean))
  }

  async checkFile(filename, options = {}) {
    const { force, pattern = '' } = options
    const cacheKey = [filename, pattern].join('@')
    const shouldSkipFile = await this.shouldSkipFile(filename, { cacheKey })
    if (!force && shouldSkipFile) {
      debug('Skip', filename)
      return []
    }

    const content = String(await readFileAsync(filename))
    const shouldSkipContent = this.shouldSkipContent(content)
    if (!force && shouldSkipContent) {
      debug('Skip', filename)
      return []
    }

    const reports = await this.checkString(content, { filename })
    const success = reports.length === 0
    if (success) {
      await this.cache.set(cacheKey, { at: new Date().getTime() })
    } else {
      await this.cache.del(cacheKey)
    }

    return reports
  }

  async checkString(content, options = {}) {
    const { filename } = options
    const lines = content.split(EOL)
    const result = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lineResult = await this.checkStringLine(line, {
        filename,
        lineNumber: i + 1,
      })
      result.push(...lineResult)
    }
    const wordCounts = result.reduce(
      (counts, report) => ({
        ...counts,
        [report.word]: (counts[report.word] || 0) + 1,
      }),
      {},
    )
    const wordsToSkip = Object.keys(wordCounts).filter(
      (word) => wordCounts[word] > this.maxOccurrence,
    )
    return result.filter((report) => !wordsToSkip.includes(report.word))
  }

  async checkStringLine(line, options = {}) {
    const { maxWordLength, minWordLength, spellChecker } = this
    const { filename, lineNumber } = options
    const words = line
      .split(/[\W_]+/)
      .filter(Boolean)
      .filter((word) => /^[a-zA-Z]+$/.test(word))
      .filter(
        (word) => minWordLength <= word.length && word.length <= maxWordLength,
      )
      .map((word) => String(word).trim())
    const reports = []
    for (const word of words) {
      const offset = line.indexOf(word)
      const isMisspelled = await this.isMisspelled(word)
      if (isMisspelled) {
        const [correction] =
          spellChecker.getCorrectionsForMisspelling(word) || []
        reports.push(
          cleanup({
            filename,
            line,
            message: `Possible miss spelling: "${word}". ${
              correction ? `Perhaps you mean "${correction}" ?` : ''
            }`,
            pos: { col: offset, line: lineNumber },
            suggest: correction,
            word,
          }),
        )
      }
    }
    return reports
  }

  async isMisspelled(word) {
    const { spellChecker } = this
    const isMisspelled = await spellChecker.isMisspelled(word)
    if (!isMisspelled) {
      return false
    }

    const [correction] = spellChecker.getCorrectionsForMisspelling(word) || []
    const shortWord =
      correction &&
      correction.replace(/[\W_]+/g, '').toLowerCase() === word.toLowerCase()
    if (shortWord) {
      return false
    }

    return true
  }

  async shouldSkipFile(filename, { cacheKey }) {
    const stat = await statAsync(filename).catch(() => null)
    if (!stat) {
      return false
    }

    const tooLarge = stat.size > this.maxFileSize
    if (tooLarge) {
      const relativeName = path.relative(process.cwd(), filename)
      console.warn(
        `[TheCode] Skipp to large file: ${relativeName} ( ${(
          stat.size / MB
        ).toFixed(2)}MB )`,
      )
      return false
    }

    const canWrite = await canWriteAsync(filename)
    if (!canWrite) {
      return true
    }

    const cached = await this.cache.get(cacheKey)
    if (!cached) {
      return false
    }

    return new Date(cached.at) >= new Date(stat.mtime)
  }
}

module.exports = TheSpell
