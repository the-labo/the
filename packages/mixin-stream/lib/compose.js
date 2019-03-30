/**
 * Compose multiple mixins into one
 * @function compose
 * @param {...function} mixins
 * @returns {function} Composed mixin
 */
'use strict'

/** @lends compose */
function compose(...mixins) {
  return function composed(Class) {
    return mixins.reduce((Class, mix) => mix(Class), Class)
  }
}

module.exports = compose
