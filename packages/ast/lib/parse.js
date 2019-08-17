'use strict'

const { EOL } = require('os')
const babelParser = require('@babel/parser')

/**
 * Parse source code
 * @memberof module:@the-/ast
 * @function parse
 * @param {string} content
 * @param {Object} [options={}]
 * @throws {Error} Parser file error
 * @returns {Object} parsed Object
 */
function parse(content, options = {}) {
  const { sourceType = 'unambiguous' } = options
  try {
    return babelParser.parse(content, {
      plugins: [
        'asyncGenerators',
        'optionalChaining',
        'jsx',
        'flow',
        'flowComments',
        'asyncGenerators',
        'objectRestSpread',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'dynamicImport',
        'nullishCoalescingOperator',
        'doExpressions',
      ],
      ranges: true,
      sourceType,
    })
  } catch (e) {
    const code = String(content)
      .split(EOL)
      .map((line, i) => `${String(i).padStart(4, ' ')}: ${line}`)
      .join(EOL)
    throw new Error(`[@the-/ast] ${e.message}

\`\`\`javascript
${code}
\`\`\`

`)
  }
}

module.exports = parse
