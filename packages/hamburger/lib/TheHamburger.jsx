'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from '@the-/button'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'
import { TheSpin } from '@the-/spin'

/**
 * Hamburger menu for the-components
 */
class TheHamburger extends React.Component {
  static Body ({ children }) {
    return (
      <div className='the-hamburger-body'>{children}</div>
    )
  }

  static Footer ({ children }) {
    return (
      <div className='the-hamburger-footer'>{children}</div>
    )
  }

  static Header ({ children }) {
    return (
      <div className='the-hamburger-header'>{children}</div>
    )
  }

  static Item ({
                 children,
                 icon,
                 onClick,
                 to,
               }) {
    return (
      <div className='the-hamburger-item'>
        <TheButton className='the-hamburger-item-button'
                   icon={icon}
                   onClick={onClick}
                   to={to}
        >
          {children}
        </TheButton>
      </div>
    )
  }

  static Toggle (props) {
    return (
      <TheButton icon={TheHamburger.TOGGLE_ICON}
                 simple
                 {...props}/>
    )
  }

  constructor () {
    super(...arguments)
    this.handleClose = this.handleClose.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleClose () {
    this.toggle(true)
  }

  handleToggle () {
    this.toggle(!this.props.hidden)
  }

  render () {
    const { props } = this
    const {
      children,
      className,
      footer,
      header,
      hidden,
    } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className', 'hidden'] })}
           {...eventHandlersFor(props, { except: [] })}
           aria-hidden={hidden}
           className={c('the-hamburger', className, {
             'the-hamburger-hidden': hidden,
           })}
      >
        <div className='the-hamburger-cover'
             onClick={this.handleToggle}
        />
        <div className='the-hamburger-inner'>
          <TheButton className='the-hamburger-close'
                     icon={TheHamburger.CLOSE_ICON}
                     onClick={this.handleClose}
                     simple
          />
          <TheHamburger.Header>
            {header}
          </TheHamburger.Header>
          <TheHamburger.Body>

            {children}
          </TheHamburger.Body>
          <TheHamburger.Footer>
            {footer}
          </TheHamburger.Footer>
        </div>
      </div>
    )
  }

  toggle (hidden) {
    const { onToggle } = this.props
    onToggle && onToggle(hidden)
  }
}

TheHamburger.CLOSE_ICON = 'fas fa-times'
TheHamburger.TOGGLE_ICON = 'fas fa-bars'

TheHamburger.propTypes = {
  /** Hidden or not */
  hidden: PropTypes.bool,
  /** Hidden state change */
  onToggle: PropTypes.func.isRequired,
  /** Shows spinner */
  spinning: PropTypes.bool,
}

TheHamburger.defaultProps = {
  hidden: true,
  onToggle: null,
}

TheHamburger.displayName = 'TheHamburger'

export default TheHamburger
