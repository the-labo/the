'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for ThePaint */
const ThePaintStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-paint-style', className)}
    id={id}
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

ThePaintStyle.data = () =>
  asStyleData({
    '.the-paint': {},
    '.the-paint-canvas': {
      '-webkit-touch-callout': 'none',
      background: 'transparent',
      touchAction: 'pinch',
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
      touchAction: 'pinch',
    },
  })

export default ThePaintStyle
