'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-component'
import { TheStyle } from '@the-/style'

/** Style for TheToast */
const TheToastStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-toast-style', className)}
    styles={TheToastStyle.data(options)}
  />
)

TheToastStyle.displayName = 'TheToastStyle'
TheToastStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheToastStyle.defaultProps = {
  options: {},
}

TheToastStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    activeOpacity = ThemeValues.activeOpacity,
    animationDuration = 100,
    contentWidth = ThemeValues.contentWidth,
    errorColor = ThemeValues.errorColor,
    infoColor = ThemeValues.infoColor,
    normalColor = ThemeValues.textColor,
    warnColor = ThemeValues.warnColor,
  } = options

  const colorToast = (color) => ({
    '.the-toast-inner': {
      borderColor: color,
      color: color,
    },
  })
  return Object.assign(
    asStyleData({
      '.the-toast': {
        display: 'block',
        margin: '0 auto',
      },
      '.the-toast-inner': {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: `4px solid ${normalColor}`,
        borderRadius: '2px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
        color: `${normalColor}`,
        display: 'inline-block',
        fontSize: '14px',
        margin: '4px auto',
        maxWidth: contentWidth,
        overflow: 'hidden',
        padding: '4px',
        textAlign: 'left',
        transition: `padding ${animationDuration}ms,border-width ${animationDuration}ms`,
        width: '240px',
      },
      '.the-toast-item': {
        '&:active': {
          opacity: activeOpacity,
        },
        display: 'block',
        overflow: 'hidden',
        padding: '2px 0',
      },
      '.the-toast-item-icon': {
        display: 'inline-block',
        pointerEvents: 'none',
      },
      '.the-toast-text': {
        cursor: 'default',
        display: 'inline-block',
        margin: '0 2px',
        pointerEvents: 'none',
      },
      '.the-toast.the-toast-empty': {
        '.the-toast-inner': {
          borderBottomWidth: 0,
          borderTopWidth: 0,
          margin: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
        height: 0,
        pointerEvents: 'none',
      },
      '.the-toast.the-toast-error ': colorToast(errorColor),
      '.the-toast.the-toast-info ': colorToast(infoColor),
      '.the-toast.the-toast-warn ': colorToast(warnColor),
    }),
    asStyleData({
      '.the-toast-group': {
        bottom: 24,
        display: 'flex',
        flexDirection: 'column',
        height: 0,
        justifyContent: 'flex-end',
        left: 0,
        overflow: 'visible',
        padding: 0,
        position: 'fixed',
        right: 0,
        textAlign: 'center',
        top: 'initial',
        zIndex: 999,
      },
    }),
  )
}

export default TheToastStyle
