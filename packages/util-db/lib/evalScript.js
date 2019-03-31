/**
 * Eval script
 * @function evalScript
 * @return {*}
 */
'use strict'

/** @lends evalScript */
function evalScript(script, options = {}) {
  const { prefix = '', variables = {} } = options
  const names = Object.keys(variables)
  return new Function(
    [...names],
    `${prefix};return (async () => (${script}))()`,
  )(...names.map((name) => variables[name]))
}

module.exports = evalScript
