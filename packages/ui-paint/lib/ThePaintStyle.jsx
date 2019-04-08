'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for ThePaint */
const ThePaintStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-paint-style', className)}
    styles={ThePaintStyle.data(options)}
  />
)

ThePaintStyle.displayName = 'ThePaintStyle'
ThePaintStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

ThePaintStyle.defaultProps = {
  options: {},
}

ThePaintStyle.data = (options) => {
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData({
    '.the-paint': {},
    '.the-paint-canvas': {
      background: 'transparent',
    },
    '.the-paint-canvas-container': {
      height: '100%',
      position: 'relative',
    },
    '.the-paint-tmp-canvas': {
      background: 'transparent',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    },
  })
}

export default ThePaintStyle
