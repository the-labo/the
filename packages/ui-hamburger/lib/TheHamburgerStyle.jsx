'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'
import { asStyleData } from '@the-/util-component'

/** Style for TheHamburger */
const TheHamburgerStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-hamburger-style', className)}
    styles={TheHamburgerStyle.data(options)}
  />
)

TheHamburgerStyle.displayName = 'TheHamburgerStyle'
TheHamburgerStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheHamburgerStyle.defaultProps = {
  options: {},
}

TheHamburgerStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
  } = options
  return asStyleData({
    '.the-hamburger': {
      background: dominantColor,
      bottom: 0,
      color: 'white',
      left: 0,
      maxWidth: contentWidth,
      position: 'fixed',
      top: 0,
      transition: 'left 300ms',
      width: '80%',
      zIndex: 8,
    },
    '.the-hamburger-close': {
      color: 'white',
      fontSize: 'smaller',
      margin: '0',
      padding: '8px 16px',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 4,
    },
    '.the-hamburger-cover': {
      background: 'rgba(0, 0, 0, 0.3)',
      bottom: 0,
      boxSizing: 'border-box',
      left: '100%',
      margin: 0,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 0,
      width: '200vw',
      zIndex: 4,
    },
    '.the-hamburger-inner': {
      display: 'block',
      margin: 0,
      padding: '8px',
      zIndex: 5,
    },
    '.the-hamburger-item': {
      boxSizing: 'border-box',
      display: 'block',
      margin: 0,
      padding: 0,
    },
    '.the-hamburger-item-button.the-button': {
      background: 'transparent',
      border: 'none',
      boxSizing: 'border-box',
      color: 'white',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      margin: 0,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%',
    },
    '.the-hamburger-list': {},
    '.the-hamburger.the-hamburger-hidden': {
      '.the-hamburger-cover': {
        width: 0,
      },
      left: '-100%',
    },
  })
}

export default TheHamburgerStyle
