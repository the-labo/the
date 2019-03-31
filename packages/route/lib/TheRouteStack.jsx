'use strict'

import { deepEqual } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheRoute from './TheRoute'

const stackIdOf = (stack) => stack && stack.map(([path]) => path).join(',')

/**
 * Tab for the-components
 */
class TheRouteStack extends React.Component {
  constructor(props) {
    super(props)
    this.innerRef = React.createRef()
    this.resize = this.resize.bind(this)
    this.requestResize = this.requestResize.bind(this)
    this.state = {
      height: 'auto',
      ready: false,
    }
  }

  componentDidMount() {
    this.registerRoutes(this.props.stack)
    this.setState({ ready: true })

    this.requestResize()
    this.resizeTimer = setInterval(() => this.resize(), 300)
  }

  componentDidUpdate(prevProps) {
    const stackChanged =
      stackIdOf(this.props.stack) !== stackIdOf(prevProps.stack)
    if (stackChanged) {
      const innerElm = this.innerRef.current
      if (innerElm) {
        innerElm.scrollTop = 0
      }
      this.registerRoutes(this.props.stack)
      this.requestResize()
    }
  }

  componentWillUnmount() {
    clearInterval(this.resizeTimer)
    clearInterval(this.resizeRequestTimer)
  }

  registerRoutes(stack) {
    this.routes = stack.map(([path, Component], i) => {
      const popPath = i > 0 ? stack[i - 1][0] : null
      return (
        <TheRouteStackRoute
          {...{ path, popPath }}
          component={Component}
          key={path}
          requestResize={this.requestResize}
        />
      )
    })
  }

  render() {
    const { props, state } = this
    const { height } = state
    const { className, direction } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className', 'style'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-route-stack', className, {
          'the-route-stack-horizontal': direction === 'horizontal',
          'the-route-stack-vertical': direction === 'vertical',
        })}
      >
        <div
          className={c('the-route-stack-inner', className)}
          ref={this.innerRef}
          style={{ height }}
        >
          {this.state.ready && this.routes}
        </div>
      </div>
    )
  }

  requestResize() {
    clearTimeout(this.resizeRequestTimer)
    this.resizeRequestTimer = setTimeout(() => {
      this.resize()
    }, 10)
  }

  resize() {
    const innerElm = this.innerRef.current
    if (!innerElm) {
      return
    }
    const activeRoute = [...innerElm.querySelectorAll('.the-route-active')]
      .filter((node) => !node.classList.contains('the-route-gone'))
      .pop()
    const contentHeight = [
      ...((activeRoute && activeRoute.children) || []),
    ].reduce((h, n) => (n.offsetHeight || 0) + h, 0)
    const height =
      contentHeight > 0
        ? contentHeight
        : (activeRoute && activeRoute.offsetHeight) || 'auto'
    const needsUpdateState = height && height !== this.state.height
    if (needsUpdateState) {
      clearTimeout(this.resizeApplyTimer)
      this.resizeApplyTimer = setTimeout(() => {
        this.setState({ height })
        innerElm.scrollTop = 0
      }, 10)
    }
  }
}

class TheRouteStackRoute extends React.Component {
  constructor(props) {
    super(props)
    this.renderComponent = this.renderComponent.bind(this)
    this.match = null
  }

  render() {
    const { path, popPath } = this.props
    return (
      <TheRoute
        {...{ path }}
        component={this.renderComponent}
        popPath={popPath}
        scrollToTop
      />
    )
  }

  renderComponent({ history, location, match, pop, popTo }) {
    const { component: Component, requestResize } = this.props
    requestResize()

    // Hack to keep immutability of `match` object
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md
    {
      const matchUnchanged = this.match && match && deepEqual(this.match, match)
      if (matchUnchanged) {
        match = this.match
      }
    }

    this.match = match
    return match ? (
      <Component {...{ history, location, match, pop, popTo }} />
    ) : null
  }
}

TheRouteStack.propTypes = {
  /** Stack direction */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Stacks */
  stack: PropTypes.array.isRequired,
}

TheRouteStack.defaultProps = {
  direction: 'horizontal',
  stack: [],
}

TheRouteStack.displayName = 'TheRouteStack'

export default TheRouteStack
