'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TheButton } from '@the-/ui-button'
import { TheContainer } from '@the-/ui-container'
import { TheIcon } from '@the-/ui-icon'
import { TheLink } from '@the-/ui-link'
import { htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'

const NOTICE_HEIGHT = 36

/**
 * Header of the-components
 */
const TheHeader = (props) => {
  const {
    asOverlay,
    asStatic,
    children,
    className,
    notices,
    reversed,
    ribbon,
    style,
  } = props
  const innerRef = useRef(null)
  const [innerHeight, setInnerHeight] = useState(null)

  const layoutIfNeeded = useCallback(() => {
    const { current: inner } = innerRef
    const newInnerHeight = inner && inner.offsetHeight
    const needsLayout = newInnerHeight && innerHeight !== newInnerHeight
    if (needsLayout) {
      setInnerHeight(newInnerHeight)
    }
  }, [innerRef, innerHeight])

  const handleResize = useCallback(() => {
    layoutIfNeeded()
  }, [layoutIfNeeded])

  useEffect(() => {
    const { window } = get('window')
    window.addEventListener('resize', handleResize)
    layoutIfNeeded()
    const layoutTimer = setInterval(() => {
      layoutIfNeeded()
    }, 500)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(layoutTimer)
    }
  }, [layoutIfNeeded, handleResize])
  useEffect(() => {
    layoutIfNeeded()
  }, [props])

  const { length: noticeCount } = Object.keys(notices || {})
  return (
    <header
      {...htmlAttributesFor(props, { except: ['className', 'style'] })}
      className={c('the-header', className, {
        'the-header-as-overlay': asOverlay,
        'the-header-as-static': asStatic,
        'the-header-reversed': reversed,
      })}
      style={{ minHeight: innerHeight }}
    >
      <div className='the-header-inner' ref={innerRef} style={style}>
        <TheContainer>{children}</TheContainer>
        <div
          className={c('the-header-notices-wrap', {
            'the-header-notices-wrap-empty': noticeCount === 0,
          })}
          style={{ height: NOTICE_HEIGHT * noticeCount }}
        >
          {Object.keys(notices || {}).map((message) => (
            <TheHeader.Notice
              actions={notices[message]}
              key={message}
              message={message}
            />
          ))}
        </div>
        {ribbon && <TheHeader.Ribbon>{ribbon}</TheHeader.Ribbon>}
      </div>
    </header>
  )
}

TheHeader.Logo = function Logo({
  'aria-label': aliaLabel = 'Top',
  children,
  className,
  to = '/',
}) {
  return (
    <TheLink
      aria-label={aliaLabel}
      className={c('the-header-logo', className)}
      to={to}
    >
      {children}
    </TheLink>
  )
}

TheHeader.Notice = function Notice(props) {
  const { actions, children, className, message } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className', 'actions'] })}
      className={c('the-header-notice', className)}
      role='alert'
      style={{ height: NOTICE_HEIGHT }}
    >
      <TheContainer className='the-header-notice-inner'>
        <div className='the-header-notice-message'>{message}</div>
        {children}
        <div className='the-header-notice-actions'>
          {Object.keys(actions).map((title) => (
            <TheButton
              className='the-header-notice-button'
              key={title}
              onClick={actions[title]}
            >
              {title}
            </TheButton>
          ))}
        </div>
      </TheContainer>
    </div>
  )
}

TheHeader.Ribbon = function Ribbon({ children, className }) {
  return <div className={c('the-header-ribbon', className)}>{children}</div>
}

TheHeader.RightArea = function RightArea(props) {
  const { children, className } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      className={c('the-header-right-area', className)}
    >
      {children}
    </div>
  )
}

TheHeader.Tab = function Tab({ children, className }) {
  return (
    <ul className={c('the-header-tab', className)} role='tablist'>
      {children}
    </ul>
  )
}

TheHeader.TabItem = function TabItem({
  activeClassName,
  activeStyle,
  children,
  className,
  exact,
  icon,
  onClick,
  text,
  to,
}) {
  if (to) {
    return (
      <li className={c('the-header-tab-item', className)} role='tab'>
        <TheLink
          activeClassName={activeClassName}
          activeStyle={activeStyle}
          exact={exact}
          onClick={onClick}
          to={to}
        >
          {icon && <TheIcon className={icon} />}
          {text && <span className='the-header-tab-item-text'>{text}</span>}
          <span className='the-header-tab-item-children'>{children}</span>
        </TheLink>
      </li>
    )
  } else {
    return (
      <li className={c('the-header-tab-item', className)} role='tab'>
        <a onClick={onClick}>
          {icon && <TheIcon className={icon} />}
          {text && <span className='the-header-tab-item-text'>{text}</span>}
          <span className='the-header-tab-item-children'>{children}</span>
        </a>
      </li>
    )
  }
}

TheHeader.propTypes = {
  /** Style as overlay */
  asOverlay: PropTypes.bool,
  /** Render with static positioning */
  asStatic: PropTypes.bool,
  /** Notices */
  notices: PropTypes.object,
  /** Reversed theme */
  reversed: PropTypes.bool,
  /** Ribbon to show */
  ribbon: PropTypes.node,
}

TheHeader.defaultProps = {
  asOverlay: false,
  asStatic: false,
  notices: {},
  reversed: false,
  ribbon: null,
  role: 'banner',
}

TheHeader.displayName = 'TheHeader'

export default TheHeader
