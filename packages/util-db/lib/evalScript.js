/**
 * Eval script
 * @memberOf module:@the-/util-db
 * @function evalScript
 * @return {*}
 */
'use strict'

/** @lends module:@the-/util-db.evalScript */
function evalScript(script, options = {}) {
  const { prefix = '', variables = {} } = options
  const names = Object.keys(variables)
  return new Function(
    [...names],
    `${prefix};return (async () => (${script}))()`,
  )(...names.map((name) => variables[name]))
}

module.exports = evalScript
