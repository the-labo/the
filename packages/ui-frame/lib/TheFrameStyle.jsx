'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'
import { asStyleData } from '@the-/util-component'

/** Style for TheFrame */
const TheFrameStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-frame-style', className)}
    styles={TheFrameStyle.data(options)}
  />
)

TheFrameStyle.displayName = 'TheFrameStyle'
TheFrameStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheFrameStyle.defaultProps = {
  options: {},
}

TheFrameStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData('.the-frame', {
    '.the-frame-embed-content': {
      height: 'fit-content',
    },
    '.the-frame-iframe': {
      border: 'none',
      display: 'block',
      width: '100%',
    },
    '&': {
      display: 'block',
      position: 'relative',
    },
  })
}

export default TheFrameStyle
