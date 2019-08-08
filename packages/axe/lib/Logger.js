/**
 * @memberof module:@the-/axe
 * @class Logger
 */
'use strict'

const { get } = require('@the-/window')

const Themes = {
  boldCourier: 'font-weight:bold;font-family:Courier;',
  critical: 'color:red;font-weight:bold;',
  light: 'color:gray;font-weight:normal;',
  minor: 'color:orange;font-weight:normal;',
  moderate: 'color:orange;font-weight:bold;',
  reset: 'color:black;font-weight:normal;',
  serious: 'color:red;font-weight:normal;',
}

/** @lends module:@the-/axe.Logger */
class Logger {
  logElement(node, logFn) {
    const document = get('document')
    const selector = node.target && node.target.toString()
    const el = document && document.querySelector(selector)
    if (el) {
      logFn('Element: %o', el)
    } else {
      logFn('Selector: %c%s', Themes.boldCourier, selector)
    }
  }

  logFailureMessage(node, key) {
    const axe = get('axe')
    if (!axe) {
      return
    }
    const message = axe._audit.data.failureSummaries[key].failureMessage(
      node[key].map((check) => check.message || ''),
    )

    console.error(message)
  }

  logFailureSummary(node, key) {
    if (node[key].length > 0) {
      this.logElement(node, console.groupCollapsed)
      this.logHtml(node)
      this.logFailureMessage(node, key)

      const relatedNodes = node[key].map((check) => check.relatedNodes)
      if (relatedNodes.length > 0) {
        console.groupCollapsed('Related nodes')
        relatedNodes.forEach((relatedNode) => {
          this.logElement(relatedNode, console.log)
          this.logHtml(relatedNode)
        })
        console.groupEnd()
      }

      console.groupEnd()
    }
  }

  logHtml(node) {
    console.log('HTML: %c%s', Themes.boldCourier, node.html)
  }

  logIssue(issue) {
    const { violation } = issue
    if (!violation) {
      return
    }
    const format = Themes[violation.impact] || Themes.minor
    console.groupCollapsed(
      '%c%s: %c%s %c( %s ) %c%s',
      format,
      violation.impact,
      Themes.reset,
      violation.help,
      Themes.light,
      violation.id,
      Themes.reset,
      violation.helpUrl,
    )
    violation.nodes.forEach((node) => {
      this.logFailureSummary(node, 'any')
      this.logFailureSummary(node, 'none')
    })
    console.groupEnd()
  }

  logIssues(issues) {
    if (issues.length === 0) {
      return
    }
    console.group('%c[aXe] %d new issues found', Themes.serious, issues.length)
    for (const issue of issues) {
      this.logIssue(issue)
    }
    console.groupEnd()
  }
}

module.exports = Logger
