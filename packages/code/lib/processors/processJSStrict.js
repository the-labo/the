/**
 * Process js "use strict" statement
 * @memberOf module:the-code/lib/processors
 * @function processJSRequire
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('the-ast')
const applyConverter = require('../helpers/applyConverter')

/** @lends processJSRequire */
function processJSRequire(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const Directives = finder.findByTypes(parsed, [NodeTypes.Directive])
    const isStrict =
      Directives.map(({ value }) => value)
        .filter(Boolean)
        .filter(({ type }) => type === 'DirectiveLiteral')
        .filter(({ value }) => value === 'use strict').length > 0
    if (isStrict) {
      return content
    }
    const contentString = String(content)
    const hasHashBang = /^#!/.test(contentString)
    if (hasHashBang) {
      const [hashBang, ...body] = contentString.split(EOL)
      return [hashBang, "'use strict'", ...body].join(EOL)
    } else {
      return ["'use strict'", contentString].join(EOL)
    }
  })
}

module.exports = processJSRequire
