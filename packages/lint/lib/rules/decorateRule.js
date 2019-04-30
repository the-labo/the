/**
 * Create "decorateRule" lint
 * @memberOf module:@the-/lint.rules
 * @function decorateRule
 * @param {Object} config - Lint config
 * @returns {function} Lint function
 */
'use strict'

const path = require('path')
const { parse, walk } = require('@the-/ast')

/** @lends module:@the-/lint.rules.decorateRule */
function decorateRule(config) {
  const { declared = false, ...rest } = config
  if (Object.keys(rest).length > 0) {
    console.warn(`[decorateRule] Unknown options`, Object.keys(rest))
  }
  return async function decorateRuleCheck({ content, filename, report }) {
    const parsed = parse(String(content), {
      sourceType: 'unambiguous',
    })
    const Decorators = []
    const StringLiterals = []
    const Identifiers = []
    walk.simple(parsed.program, {
      Decorator: (node) => Decorators.push(node),
      Identifier: (node) => Identifiers.push(node),
      StringLiteral: (node) => StringLiterals.push(node),
    })

    if (declared) {
      const PossibleIdentifiers = [StringLiterals, Identifiers]
      for (const Decorator of Decorators) {
        const {
          expression,
          loc: { column, line },
        } = Decorator
        if (!expression) {
          continue
        }
        const ok = PossibleIdentifiers.some((Identifiers) =>
          Identifiers.some(
            (Identifier) =>
              Identifier.name === expression.name &&
              (Identifier.start < Decorator.start ||
                Decorator.end < Identifier.start),
          ),
        )
        !ok &&
          report('Unknown decorator', {
            actual: true,
            code: String(content).substring(Decorator.start, Decorator.end),
            expect: false,
            loc: { column, line },
            name: expression.name,
            where: path.resolve(filename),
          })
      }
    }
  }
}

module.exports = decorateRule
