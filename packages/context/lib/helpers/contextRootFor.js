'use strict'

const React = require('react')

const { createElement } = React

/**
 * ContextRoot component
 * @memberof module:@the-/context.helpers
 * @function ContextRootFor
 * @returns {*}
 */
function contextRootFor(context, { value }) {
  const { Provider } = context

  /**
   * @memberof module:@the-/context.helpers.contextRootFor
   * @function ContextRoot
   * @inner
   * @param props
   * @returns {Object}
   */
  function ContextRoot({ children }) {
    return createElement(Provider, { value }, children)
  }

  return ContextRoot
}

module.exports = contextRootFor
