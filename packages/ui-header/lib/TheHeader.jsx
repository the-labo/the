'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
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
class TheHeader extends React.Component {
  static Logo({ children, className, to = '/' }) {
    return (
      <TheLink className={c('the-header-logo', className)} to={to}>
        {children}
      </TheLink>
    )
  }

  static Notice(props) {
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

  static Ribbon({ children, className }) {
    return <div className={c('the-header-ribbon', className)}>{children}</div>
  }

  static RightArea(props) {
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

  static Tab({ children, className }) {
    return (
      <ul className={c('the-header-tab', className)} role='tablist'>
        {children}
      </ul>
    )
  }

  static TabItem({
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

  constructor(props) {
    super(props)
    this.inner = null
    this.handleResize = this.handleResize.bind(this)
    this.handleInnerRef = this.handleInnerRef.bind(this)
    this.state = {
      innerHeight: null,
    }
    this.layoutTimer = -1
  }

  componentDidMount() {
    const { window } = get('window')
    window.addEventListener('resize', this.handleResize)
    this.doLayout()

    this.layoutTimer = setInterval(() => {
      this.layoutIfNeeded()
    }, 500)
  }

  componentDidUpdate() {
    this.layoutIfNeeded()
  }

  componentWillUnmount() {
    const { window } = get('window')
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.layoutTimer)
  }

  doLayout() {
    const { inner } = this
    const innerHeight = inner && inner.offsetHeight
    if (this.state.innerHeight !== innerHeight) {
      this.setState({ innerHeight })
    }
  }

  handleInnerRef(inner) {
    this.inner = inner
  }

  handleResize(e) {
    this.doLayout()
  }

  layoutIfNeeded() {
    const { inner } = this
    const innerHeight = inner && inner.offsetHeight
    const needsLayout = innerHeight && this.state.innerHeight !== innerHeight
    if (needsLayout) {
      this.doLayout()
    }
  }

  render() {
    const {
      props,
      props: {
        asOverlay,
        asStatic,
        children,
        className,
        notices,
        reversed,
        ribbon,
        style,
      },
      state: { innerHeight },
    } = this

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
        <div
          className='the-header-inner'
          ref={this.handleInnerRef}
          style={style}
        >
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
