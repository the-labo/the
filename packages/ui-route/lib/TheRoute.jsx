'use strict'

import { get } from 'bwindow'
import c from 'classnames'
import Debug from 'debug'
import PropTypes from 'prop-types'
import React from 'react'
import { matchPath, Redirect, Route, Switch } from 'react-router-dom'
import { htmlAttributesFor } from '@the-/util-ui'

const debug = Debug('the:route')

/**
 * Route of the-components
 */
class TheRoute extends React.Component {
  constructor(props) {
    super(props)
    this.state = { gone: false, ready: false }
    this.handlePop = this.handlePop.bind(this)
    this.handlePopTo = this.handlePopTo.bind(this)
    this.handleChildren = this.handleChildren.bind(this)
    this.popTimer = -1
    this.history = null
  }

  componentDidMount() {
    this.setState({ gone: false, ready: true })
  }

  componentWillUnmount() {
    clearTimeout(this.popTimer)
  }

  handleChildren(routeProps) {
    const {
      props,
      props: {
        children,
        className,
        component: Component,
        disabled,
        exact,
        path,
        strict,
      },
      state: { gone, ready },
    } = this
    if (disabled) {
      return null
    }
    const history = routeProps.history
    const active = !!matchPath(history.location.pathname, {
      exact,
      path,
      strict,
    })
    const shouldRenderComponent = Boolean(ready && Component)
    debug('active', active, { path, shouldRenderComponent })
    this.history = history
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-route', className, {
          'the-route-active': active,
          'the-route-gone': gone,
        })}
      >
        {shouldRenderComponent ? (
          <Component
            {...routeProps}
            pop={this.handlePop}
            popTo={this.handlePopTo}
          />
        ) : null}
        {children}
      </div>
    )
  }

  handlePop() {
    return this.handlePopTo(this.props.popPath)
  }

  handlePopTo(popPath) {
    if (!popPath) {
      throw new Error('[TheRoute] popPath is required')
    }
    const { history } = this
    if (typeof popPath !== 'string') {
      throw new Error(`[TheRoute] Invalid pop path: ${popPath}`)
    }
    const { gone, ready } = this.state
    if (gone || !ready) {
      return
    }
    this.setState({ gone: true })
    if (!this.props.popPath) {
      console.warn('[TheRoute] No where to pop')
      return
    }
    clearTimeout(this.popTimer)
    this.popTimer = setTimeout(() => {
      history.push(popPath)
      this.popTimer = -1
      setTimeout(() => {
        if (this.state.gone) {
          this.setState({ gone: false })
        }
      }, 0)
    }, this.props.animationDuration)
  }

  render() {
    const { props } = this
    const { exact, location, path, scrollToTop, strict } = props

    const element = (
      <Route
        children={this.handleChildren}
        exact={exact}
        path={path}
        strict={strict}
      />
    )

    return scrollToTop ? (
      <TheRoute.ScrollToTop location={location}>{element}</TheRoute.ScrollToTop>
    ) : (
      element
    )
  }
}

TheRoute.propTypes = {
  /** Animation duration */
  animationDuration: PropTypes.number,
  /** Component class */
  component: PropTypes.any,
  /** Exact match */
  exact: PropTypes.bool,
  /** Routing path */
  path: PropTypes.string,
  /** Render function */
  scrollToTop: PropTypes.bool,
  /** Strict match */
  strict: PropTypes.bool,
}

TheRoute.defaultProps = {
  animationDuration: 400,
  scrollToTop: false,
}

TheRoute.displayName = 'TheRoute'

TheRoute.Switch = Switch
TheRoute.Redirect = Redirect

TheRoute.Status = ({ children, code }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return (
        <div className='the-route-status' data-status-code={code}>
          {children}
        </div>
      )
    }}
  />
)

// https://reacttraining.com/react-router/web/guides/scroll-restoration
TheRoute.ScrollToTop = class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const locationChanged = this.props.location !== prevProps.location
    if (locationChanged) {
      const window = get('window')
      window && window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default TheRoute
