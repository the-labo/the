/**
 * ContextRoot component
 * @memberof module:@the-/context.helpers
 * @function ContextRootFor
 */
'use strict'

const React = require('react')
const { createElement } = React

/** @lends module:@the-/context.helpers.contextRootFor */
function contextRootFor(context, { value }) {
  const { Provider } = context

  class ContextRoot extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const { children } = this.props
      return createElement(Provider, { value }, children)
    }
  }

  return ContextRoot
}

module.exports = contextRootFor
