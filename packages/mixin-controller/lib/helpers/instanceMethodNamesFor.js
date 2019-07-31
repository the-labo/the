'use strict'

/**
 * @function instanceMethodNamesFor
 */
/** @lends instanceMethodNamesFor */
function instanceMethodNamesFor(instance, descriptors) {
  return Object.keys(descriptors)
    .filter(
      (name) =>
        ![
          'constructor',
          'toString',
          'toJSON',
          'then',
          'catch',
          'finally',
          'valueOf',
        ].includes(name),
    )
    .filter(
      (name) =>
        ![/^controllerWill/, /^controllerDid/, /^controllerMethod/].some(
          (pattern) => pattern.test(name),
        ),
    )
    .filter((name) => !/^_/.test(name))
    .filter((name) => {
      const { get, set } = descriptors[name]
      return !get && !set
    })
    .filter((name) => typeof instance[name] === 'function')
}

module.exports = instanceMethodNamesFor
