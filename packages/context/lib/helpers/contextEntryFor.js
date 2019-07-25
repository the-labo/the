'use strict'
/**
 * Entry component
 * @memberof module:@the-/context.helpers
 * @class ContextEntry
 */
const { shallowEqual } = require('asobj')
const memoizeOne = require('memoize-one')
const PropTypes = require('prop-types')
const React = require('react')

const ComponentWithRenderer = memoizeOne((renderer) => React.memo(renderer))

/** @lends module:@the-/context.helpers.contextEntryFor */
function contextEntryFor(context, { store }) {
  class ContextEntry extends React.Component {
    constructor(props) {
      super(props)
      this.unsubscribeStore = null
      const { init } = props
      {
        const initialized = init(store.state)
        const piped = this.getPiped()
        this.state = { initialized, piped }
      }
    }

    applyRenderer(renderable) {
      const {
        props: { children: renderer },
      } = this
      const Component = ComponentWithRenderer(renderer)
      return React.createElement(Component, {
        ...renderable,
      })
    }

    componentDidMount() {
      this.updatePipe()
      this.unsubscribeStore = store.subscribe(() => this.updatePipe())
    }

    componentWillUnmount() {
      this.unsubscribeStore()
    }

    getPiped() {
      const {
        props: { pipe },
      } = this
      return pipe(store.state)
    }

    render() {
      const {
        state: { initialized, piped },
      } = this
      return this.applyRenderer({
        ...initialized,
        ...piped,
      })
    }

    updatePipe() {
      const piped = this.getPiped()
      const skip = shallowEqual(this.state.piped, piped)
      if (skip) {
        return
      }
      this.setState({ piped })
    }
  }

  ContextEntry.contextType = context
  ContextEntry.propTypes = {
    children: PropTypes.func,
    init: PropTypes.func,
    pipe: PropTypes.func,
  }
  ContextEntry.defaultProps = {
    init: () => ({}),
    pipe: (v) => v,
  }
  return ContextEntry
}

module.exports = contextEntryFor
