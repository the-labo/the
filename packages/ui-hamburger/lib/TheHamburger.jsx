'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { StylePresets } from '@the-/const-ui'
import TheButton from '@the-/ui-button/shim/TheButton'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  toggleBodyClass,
} from '@the-/util-ui'

const BODY_FIX_STYLE = Object.entries(StylePresets.FixedBody)
  .map(([k, v]) => `${k}: ${v} !important`)
  .join(';')

/**
 * Hamburger menu for the-components
 */
const TheHamburger = (props) => {
  const {
    children,
    className,
    footer,
    header,
    hidden,
    onToggle,
    zIndex,
  } = props

  const id = useMemo(() => props.id || newId({ prefix: 'the-hamburger-' }), [
    props.id,
  ])

  const toggleDocumentScroll = useCallback(
    (fixed) => toggleBodyClass(`the-hamburger-fix-for-${id}`, fixed),
    [id],
  )
  useEffect(() => {
    toggleDocumentScroll(!hidden)
    return () => toggleDocumentScroll(false)
  }, [hidden, id])

  const toggle = useCallback(
    (hidden) => {
      onToggle && onToggle(hidden)
    },
    [onToggle],
  )

  const handleClose = useCallback(() => {
    toggle(true)
  }, [toggle])

  const handleToggle = useCallback(() => {
    toggle(!hidden)
  }, [toggle, hidden])

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className', 'hidden'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-hidden={hidden}
      className={c('the-hamburger', className, {
        'the-hamburger-hidden': hidden,
      })}
      id={id}
    >
      <div className='the-hamburger-cover' onClick={handleToggle} />
      <div className='the-hamburger-inner'>
        <style className='the-hamburger-fix-style'>
          {`.the-hamburger-fix-for-${id} { ${BODY_FIX_STYLE} }`}
          {zIndex ? `#${id} {z-index: ${zIndex};}` : null}
        </style>
        <TheButton
          className='the-hamburger-close'
          icon={TheHamburger.CLOSE_ICON}
          onClick={handleClose}
          simple
        />
        <TheHamburger.Header>{header}</TheHamburger.Header>
        <TheHamburger.Body>{children}</TheHamburger.Body>
        <TheHamburger.Footer>{footer}</TheHamburger.Footer>
      </div>
    </div>
  )
}

TheHamburger.Body = function Body({ children }) {
  return <div className='the-hamburger-body'>{children}</div>
}

TheHamburger.Footer = function Footer({ children }) {
  return <div className='the-hamburger-footer'>{children}</div>
}

TheHamburger.Header = function Header({ children }) {
  return <div className='the-hamburger-header'>{children}</div>
}

TheHamburger.Item = function Item({ children, icon, onClick, to }) {
  return (
    <div className='the-hamburger-item'>
      <TheButton
        className='the-hamburger-item-button'
        icon={icon}
        onClick={onClick}
        to={to}
      >
        {children}
      </TheButton>
    </div>
  )
}

TheHamburger.Toggle = function Toggle(props) {
  return <TheButton icon={TheHamburger.TOGGLE_ICON} simple {...props} />
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
