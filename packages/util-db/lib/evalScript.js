'use strict'

/* eslint-disable no-new-func */
/**
 * Eval script
 * @memberof module:@the-/util-db
 * @function evalScript
 * @param script
 * @param [options={}]
 * @returns {*}
 */
function evalScript(script, options = {}) {
  const { prefix = '', variables = {} } = options
  const names = Object.keys(variables)
  return new Function(
    [...names],
    `${prefix};return (async () => (${script}))()`,
  )(...names.map((name) => variables[name]))
}

module.exports = evalScript
