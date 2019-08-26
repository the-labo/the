'use strict'

const { injectScript } = require('@the-/util-dom')
const { get } = require('@the-/window')
const Logger = require('./Logger')

/**
 * Create instance
 * @memberof module:@the-/axe
 * @class TheAxe
 */
class TheAxe {
  constructor(options = {}) {
    const {
      interval = 10 * 1000,
      src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/3.3.1/axe.js',
    } = options
    this.interval = interval
    this.issueIds = new Set()
    this.src = src
  }

  report(data) {
    const issues = data.violations
      .map((violation) => {
        const id = [
          violation.id,
          violation.nodes.map((node) => node.target.toString()).join(','),
        ].join('/')
        return { id, violation }
      })
      .filter(({ id }) => !this.issueIds.has(id))
    for (const { id } of issues) {
      this.issueIds.add(id)
    }

    const logger = new Logger()
    logger.logIssues(issues)
  }

  /**
   * Start interval
   */
  start() {
    this.issueIds = new Set()
    const timer = setInterval(() => {
      void this.tick()
    }, this.interval)
    void injectScript(this.src).then(() => this.tick())
    return () => clearInterval(timer)
  }

  async inspect() {
    const axe = get('axe', { strict: true })
    const body = get('document.body')
    return new Promise((resolve, reject) => {
      axe.run(
        body,
        {
          reporter: 'v2',
          restoreScroll: true,
        },
        (err, results) => (err ? reject(err) : resolve(results)),
      )
    })
  }

  async tick() {
    const data = await this.inspect().catch((e) => {
      console.warn('[TheAxe] Inspection failed:', e)
      return null
    })
    if (!data) {
      return
    }

    this.report(data)
  }
}

module.exports = TheAxe
