'use strict'
/**
 * Entry component
 * @memberof module:@the-/context.helpers
 * @class ContextEntry
 */
const { shallowEqual } = require('asobj')
const PropTypes = require('prop-types')
const React = require('react')

/** @lends module:@the-/context.helpers.contextEntryFor */
function contextEntryFor(context, { store }) {
  class ContextEntry extends React.Component {
    constructor(props) {
      super(props)
      this.unsubscribeStore = null
      this.pipeProxy = new Proxy(
        {},
        {
          get: (target, name) => this.state.piped[name],
          set: () => {
            throw new Error('[TheContext] Cannot set value on pipeProxy')
          },
        },
      )
      const { init } = props
      {
        const initialized = init(store.state, this.pipeProxy)
        const piped = this.getPiped()
        this.state = { initialized, piped }
      }
    }

    applyRenderer(renderable) {
      const { children: renderer } = this.props
      return renderer(renderable)
    }

    componentDidMount() {
      this.updatePipe()
      this.unsubscribeStore = store.subscribe(() => this.updatePipe())
    }

    componentWillUnmount() {
      this.unsubscribeStore()
    }

    getPiped() {
      const { pipe } = this.props
      return pipe(store.state)
    }

    render() {
      const { initialized, piped } = this.state
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
