'use strict'
/**
 * @memberof module:@the-/server.helpers
 * @function controllerSpecsFor
 */
/** @lends module:@the-/server.helpers.controllerSpecsFor */
function controllerSpecsFor(controllerModules) {
  return Object.entries(controllerModules).map(([name, module]) => ({
    methods: Object.assign(
      {},
      ...Object.keys(module).map((name) => ({
        [name]: { desc: `${name}` },
      })),
    ),
    name,
  }))
}

module.exports = controllerSpecsFor
