/**
 * Parse source code
 * @memberof module:@the-/ast
 * @function parse
 * @param {string} src
 * @param {Object} [options={}]
 * @throws {Error} Parser file error
 * @returns {Object} parsed Object
 */
'use strict'

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
    throw new Error(`[TheCode] ${e.message}

\`\`\`javascript
${content}
\`\`\`

`)
  }
}

module.exports = parse
