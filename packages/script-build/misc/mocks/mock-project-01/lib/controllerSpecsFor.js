/**
 * @function controllerSpecsFor
 */
'use strict'

/** @lends controllerSpecsFor */
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

export default controllerSpecsFor
