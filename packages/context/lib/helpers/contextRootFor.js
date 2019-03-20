/**
 * ContextRoot component
 * @memberof module:@the-/context
 * @function ContextRootFor
 */
'use strict'

const React = require('react')
const theAssert = require('the-assert')

const assert = theAssert('[TheContext][ContextRoot]')

const { createElement } = React

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
