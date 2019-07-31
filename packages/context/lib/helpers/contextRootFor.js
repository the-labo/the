'use strict'

/**
 * ContextRoot component
 * @memberof module:@the-/context.helpers
 * @function ContextRootFor
 */
const React = require('react')

const { createElement } = React

/** @lends module:@the-/context.helpers.contextRootFor */
function contextRootFor(context, { value }) {
  const { Provider } = context

  class ContextRoot extends React.Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const {
        props: { children },
      } = this
      return createElement(Provider, { value }, children)
    }
  }

  return ContextRoot
}

module.exports = contextRootFor
