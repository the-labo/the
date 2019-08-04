/**
 * Create instance
 * @memberof module:@the-/axe
 * @class TheAxe
 */
'use strict'

const axe = require('axe-core')
const { get } = require('@the-/window')
const Logger = require('./Logger')

/** @lends module:@the-/axe.TheAce */
class TheAxe {
  constructor(options = {}) {
    const { interval = 10000 } = options
    this.interval = interval
    this.issueIds = new Set()
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
    this.tick()
    return () => clearInterval(timer)
  }

  async inspect() {
    const body = get('document.body')
    return new Promise((resolve, reject) => {
      axe.run(body, { reporter: 'v2' }, (err, results) =>
        err ? reject(err) : resolve(results),
      )
    })
  }

  async tick() {
    const data = await this.inspect().catch(() => {
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
