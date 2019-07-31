'use strict'

/**
 * Parse source code
 * @memberof module:@the-/ast
 * @function parse
 * @param {string} src
 * @param {Object} [options={}]
 * @throws {Error} Parser file error
 * @returns {Object} parsed Object
 */
const { EOL } = require('os')
const babelParser = require('@babel/parser')

/** @lends module:@the-/ast.parse */
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
        ['pipelineOperator', { proposal: 'minimal' }],
        // TODO use 'decorators',
        'decorators-legacy',
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
