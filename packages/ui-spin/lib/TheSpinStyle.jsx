'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheSpin */
const TheSpinStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-spin-style', className)}
    styles={TheSpinStyle.data(options)}
  />
)

TheSpinStyle.displayName = 'TheSpinStyle'
TheSpinStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheSpinStyle.defaultProps = {
  options: {},
}

TheSpinStyle.data = (options) => {
  const {
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
  } = options
  return asStyleData({
    '.the-spin': {
      display: 'none',
      textAlign: 'center',
    },
    '.the-spin.the-spinner-cover': {
      alignItems: 'center',
      background: overlayBackgroundColor,
      bottom: 0,
      color: lightTextColor,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 4,
    },
    '.the-spin.the-spinner-enabled': {
      alignItems: 'center',
      display: 'inline-flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    '.the-spinner-icon': {
      display: 'inline-block',
      margin: '0 4px',
      opacity: 1,
      transition: 'opacity 100ms',
    },
  })
}

export default TheSpinStyle
