'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheImage */
const TheImageStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-image-style', className)}
    id={id}
    styles={TheImageStyle.data(options)}
  />
)

TheImageStyle.displayName = 'TheImageStyle'
TheImageStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheImageStyle.defaultProps = {
  options: {},
}

TheImageStyle.data = (options) => {
  const {
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
  } = options
  return asStyleData({
    '.the-image': {
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative',
    },
    '.the-image-img': {
      objectFit: 'none',
      transition: 'width 300ms, height 300ms',
    },
    '.the-image-img-failed': {
      opacity: 0,
      visibility: 'hidden',
    },
    '.the-image-inner': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      width: 'auto',
    },
    '.the-image-notfound': {
      alignItems: 'center',
      color: lightTextColor,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
    },
    '.the-image-spin': {
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
      padding: '8px 0',
      position: 'absolute',
      right: 0,
      textAlign: 'center',
      top: 0,
      zIndex: 1,
    },
    '.the-image.the-image-fill': {
      '.the-image-img': {
        boxSizing: 'border-box',
        objectFit: 'cover',
        width: '100%',
      },
    },
    '.the-image.the-image-fit': {
      '.the-image-img': {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'scale-down',
      },
    },
  })
}

export default TheImageStyle
