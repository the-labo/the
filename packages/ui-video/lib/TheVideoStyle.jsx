'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheVideo */
const TheVideoStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-video-style', className)}
    styles={TheVideoStyle.data(options)}
  />
)

TheVideoStyle.displayName = 'TheVideoStyle'
TheVideoStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheVideoStyle.defaultProps = {
  options: {},
}

TheVideoStyle.data = (options) => {
  const {
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
  } = options
  return asStyleData({
    '.the-video': {
      backgroundColor: lightBackgroundColor,
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative',
    },
    '.the-video-failed': {
      color: lightTextColor,
      textAlign: 'center',
    },
    '.the-video-inner': {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      overflow: 'hidden',
      width: '100%',
    },
    '.the-video-spinner': {
      '.the-icon-spin': {
        fontSize: 'larger',
      },
      alignItems: 'center',
      backgroundColor: overlayBackgroundColor,
      bottom: 0,
      color: lightTextColor,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    '.the-video-video': {
      transition: 'width 300ms, height 300ms',
    },
    '.the-video-video-failed': {
      opacity: 0,
      visibility: 'hidden',
    },
    '.the-video.the-video-fill': {
      '.the-video-video': {
        minHeight: '100%',
        minWidth: '100%',
        objectFit: 'cover',
      },
    },
    '.the-video.the-video-fit': {
      '.the-video-video': {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
      },
    },
  })
}

export default TheVideoStyle
