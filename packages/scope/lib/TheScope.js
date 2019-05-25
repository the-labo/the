'use strict'
/**
 * Abstract state class
 * @memberof module:@the-/scope
 * @abstract
 * @class TheScope
 * @param {string} name - Name of state
 * @param {Object} config - TheScope config
 */
const {
  ArrayScope,
  BooleanScope,
  NullScope,
  NumberScope,
  ObjectScope,
  Scope,
  ValueScope,
} = require('./scopes')

/** @lends TheScope */
class TheScope extends Scope {}

Object.assign(TheScope, {
  Array: ArrayScope,
  Boolean: BooleanScope,
  Null: NullScope,
  Number: NumberScope,
  Object: ObjectScope,
  Value: ValueScope,
})

module.exports = TheScope
