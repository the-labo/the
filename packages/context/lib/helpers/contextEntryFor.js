'use strict'

/**
 * Entry component
 * @memberof module:@the-/context.helpers
 * @function contextEntryFor
 */
const { shallowEqual } = require('asobj')
const PropTypes = require('prop-types')
const React = require('react')

/** @lends module:@the-/context.helpers.contextEntryFor */
function contextEntryFor(context, { store }) {
  /**
   * @memberof module:@the-/context.helpers.contextEntryFor
   * @inner
   * @class ContextEntry
   */
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
