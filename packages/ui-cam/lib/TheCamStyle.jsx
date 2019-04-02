'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-ui'
import { TheStyle } from '@the-/ui-style'
import CamInputStyleData from './styleData/CamInputStyleData'

/** Style for TheCam */
const TheCamStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-cam-style', className)}
    styles={TheCamStyle.data(options)}
  />
)

TheCamStyle.displayName = 'TheCamStyle'
TheCamStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheCamStyle.defaultProps = {
  options: {},
}

TheCamStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
    errorColor = ThemeValues.errorColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options
  return {
    ...asStyleData({
      '.the-cam': {
        position: 'relative',
      },
      '.the-cam-inner': {},
      '.the-cam-rejected': {
        color: errorColor,
        display: 'block',
        fontSize: '2.5em',
        fontStyle: 'italic',
        margin: '48px auto',
        textAlign: 'center',
      },
      '.the-cam-spin': {},
      '.the-cam-video': {
        background: '#333',
        height: '100%',
        objectFit: 'contain',
        width: '100%',
      },
    }),
    ...CamInputStyleData({
      dominantColor,
      tappableHeight,
    }),
  }
}

export default TheCamStyle
