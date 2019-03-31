'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import TheLinkStyle from './TheLinkStyle'

/**
 * Link of the-components
 */
class TheLink extends React.Component {
  static Link(props) {
    const { children, className, to } = props
    const { protocol } =
      (to &&
        typeof to === 'string' &&
        new URL(to, get('location.href') || void 0)) ||
      {}
    if (protocol) {
      // External link
      return (
        <a
          {...htmlAttributesFor(props, { except: ['className', 'href'] })}
          {...eventHandlersFor(props, { except: [] })}
          className={c('the-link-external', className)}
          href={to}
        >
          {children}
        </a>
      )
    }
    return <NavLink {...props}>{children}</NavLink>
  }

  render() {
    const { props } = this
    const {
      activeClassName,
      activeStyle,
      children,
      className,
      color,
      exact,
      icon,
      replace,
      strict,
      style = {},
      to,
    } = props
    if (color && style) {
      style.color = color
    }
    return (
      <TheLink.Link
        {...htmlAttributesFor(props, { except: ['className', 'style'] })}
        {...eventHandlersFor(props, { except: [] })}
        activeClassName={c('the-link-active', activeClassName)}
        className={c('the-link', className)}
        {...{ activeStyle, exact, replace, strict, style, to }}
      >
        {icon && <TheIcon className={c('the-link-icon', icon)} />}
        {children}
      </TheLink.Link>
    )
  }
}

TheLink.Style = TheLinkStyle

TheLink.propTypes = {
  /** Class name for active state */
  activeClassName: PropTypes.string,
  /** Style for active state */
  activeStyle: PropTypes.object,
  /** Color theme */
  color: PropTypes.string,
  /** Exact path */
  exact: PropTypes.bool,
  /** Icon class name */
  icon: PropTypes.string,
  /** String path */
  strict: PropTypes.bool,
  /** Link to */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
}

TheLink.defaultProps = {
  activeClassName: null,
  activeStyle: {},
  color: null,
  exact: false,
  icon: null,
  replace: false,
  role: 'link',
  strict: false,
  to: null,
}

TheLink.displayName = 'TheLink'

export default TheLink
