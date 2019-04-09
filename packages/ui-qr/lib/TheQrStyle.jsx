'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-ui'
import { TheStyle } from '@the-/ui-style'

/** Style for TheQr */
const TheQrStyle = ({ className, id, options }) => (
  <TheStyle {...{ id }}
            className={classnames('the-qr-style', className)}
            styles={TheQrStyle.data(options)}
  />
)

TheQrStyle.displayName = 'TheQrStyle'
TheQrStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheQrStyle.defaultProps = {
  options: {},
}

TheQrStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    dominantColor = ThemeValues.dominantColor,
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightTextColor = ThemeValues.lightTextColor,
  } = options
  return asStyleData('.the-qr', {
    '.the-qr-alt': {
      alignItems: 'center',
      backgroundColor: lightBackgroundColor,
      bottom: 0,
      color: lightTextColor,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 3,
    },
    '&': {
      display: 'inline-block',
      position: 'relative',
    },
  })
}

export default TheQrStyle
