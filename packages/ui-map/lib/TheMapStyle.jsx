'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'
import PositionInputStyleData from './styleData/PositionInputStyleData'

/** Style for TheMap */
const TheMapStyle = ({ className, id, options }) => [
  <TheStyle
    {...{ id }}
    className={c('the-map-style', className)}
    key='base'
    styles={TheMapStyle.data(options)}
  />,
  ...TheMapStyle.externals.map((src) => (
    <link
      className={c('the-map-style-external')}
      href={src}
      key={src}
      rel='stylesheet'
    />
  )),
]

TheMapStyle.displayName = 'TheMapStyle'
TheMapStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheMapStyle.defaultProps = {
  options: {},
}

TheMapStyle.externals = ['https://unpkg.com/leaflet@1.3.4/dist/leaflet.css']

TheMapStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
    inputBorderColor = ThemeValues.inputBorderColor,
  } = options
  return {
    ...asStyleData({
      '.the-map': {
        background: '#F8F8F8',
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      },
      '.the-map-map': {
        '&.leaflet-container': {
          background: 'transparent',
        },
        display: 'block',
        height: '150px',
        maxWidth: '100%',
        width: '100%',
      },
      '.the-map-map-freezed': {
        '.leaflet-control': {
          display: 'none',
        },
        pointerEvents: 'none',
      },
      '.the-map-marker': {
        '> *': {
          flexShrink: 0,
        },
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      },
      '.the-map-marker-div-icon.leaflet-div-icon': {
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'visible',
      },
      '.the-map-tile': {},
      '.the-map-tile-loading': {
        '.the-map-title-loading-msg': { display: 'flex' },
      },
      '.the-map-title-loading-msg': {
        alignItems: 'center',
        bottom: 0,
        color: '#AAA',
        display: 'none',
        fontSize: '36px',
        fontStyle: 'italic',
        justifyContent: 'center',
        left: 0,
        opacity: 0.1,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0,
        zIndex: 1,
      },
    }),
    ...PositionInputStyleData({
      dominantColor,
      inputBorderColor,
    }),
  }
}

export default TheMapStyle
