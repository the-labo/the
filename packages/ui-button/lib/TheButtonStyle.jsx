'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'
import { asStyleData } from '@the-/util-component'

/** Style for TheButton */
const TheButtonStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-button-style', className)}
    styles={TheButtonStyle.data(options)}
  />
)

TheButtonStyle.displayName = 'TheButtonStyle'
TheButtonStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheButtonStyle.defaultProps = {
  options: {},
}

TheButtonStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    backgroundColor = ThemeValues.backgroundColor,
    contentWidth = ThemeValues.contentWidth,
    dangerColor = '#A33',
    disabledBackgroundColor = ThemeValues.disabledBackgroundColor,
    disabledTextColor = ThemeValues.disabledTextColor,
    dominantColor = ThemeValues.dominantColor,
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    overlayTextColor = ThemeValues.overlayTextColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-button': {
        alignItems: 'center',
        backgroundColor,
        border: `1px solid`,
        borderRadius: '4px',
        boxSizing: 'border-box',
        color: dominantColor,
        cursor: 'pointer',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '4px',
        maxWidth: contentWidth,
        minHeight: tappableHeight,
        outlineColor: dominantColor,
        padding: '0.5em 1em',
        position: 'relative',
        textAlign: 'center',
        textDecoration: 'none',
      },
      '.the-button-icon': {
        marginLeft: '0',
        marginRight: '2px',
      },
      '.the-button-icon-right': {
        marginLeft: '2px',
        marginRight: '0',
      },
      '.the-button-inner': {
        display: 'inline-block',
      },
      '.the-button-large-icon': {
        display: 'block',
        fontSize: '3em',
        margin: '0',
      },
      '.the-button-spinner': {
        alignItems: 'center',
        backgroundColor: overlayBackgroundColor,
        borderColor: overlayBackgroundColor,
        bottom: 0,
        color: overlayTextColor,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
      '.the-button-text': {
        display: 'inline-block',
        padding: '0 2px',
      },
      '.the-button:active': {
        boxShadow: '1px 2px 2px rgba(0,0,0,0.33) inset',
      },
      '.the-button:hover': {
        opacity: '0.9',
      },
      '.the-button.the-button-danger': {
        backgroundColor: dangerColor,
        border: dangerColor,
        color: 'white',
      },
      '.the-button.the-button-disabled': {
        '&:hover, &:active': {
          boxShadow: 'none',
          cursor: 'default',
        },
        '&.the-button-primary': {
          backgroundColor: disabledBackgroundColor,
          borderColor: disabledTextColor,
          color: disabledTextColor,
        },
        backgroundColor: disabledBackgroundColor,
        color: disabledTextColor,
        cursor: 'default',
        pointerEvents: 'none',
      },
      '.the-button.the-button-floated': {
        '&:active': {
          boxShadow: 'none',
        },
        boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
      },
      '.the-button.the-button-large': {
        fontSize: '2em',
      },
      '.the-button.the-button-light': {
        backgroundColor: 'transparent',
        borderColor: lightTextColor,
        color: lightTextColor,
      },
      '.the-button.the-button-primary': {
        backgroundColor: dominantColor,
        borderColor: dominantColor,
        color: backgroundColor,
      },
      '.the-button.the-button-rounded': {
        '.the-button-icon': {
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          fontSize: '3em',
          justifyContent: 'center',
          left: 0,
          opacity: 0.12,
          pointerEvents: 'none',
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
        },
        '.the-button-spinner': {
          borderRadius: '50%',
        },
        borderRadius: '50%',
        borderWidth: '4px',
        height: '6em',
        width: '6em',
      },
      '.the-button.the-button-simple': {
        '&:active': {
          boxShadow: 'none',
        },
        backgroundColor: 'transparent',
        border: 'none',
      },
      '.the-button.the-button-small': {
        fontSize: 'small',
        minHeight: '12px',
      },
      '.the-button.the-button-vertical': {
        flexDirection: 'column',
      },
      '.the-button.the-button-wide': {
        boxSizing: 'border-box',
        display: 'flex',
        margin: '4px auto',
        width: '100%',
      },
      '.the-button.the-link': {
        display: 'inline-flex',
        padding: '0.5em 1em',
      },
    }),
    asStyleData({
      '.the-button-group': {
        '.the-button': {
          flexGrow: 1,
        },
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '8px auto',
        maxWidth: contentWidth,
        width: '100%',
      },
      '.the-button-group.the-button-group-collapsed': {
        '.the-button': {
          '&:first-child': {
            borderLeft: 'none',
            margin: '0',
          },
          '&:last-child': {
            borderRight: 'none',
          },
          borderBottom: 'none',
          borderRadius: 0,
          borderRight: 'none',
          margin: '0 -1px 0 0',
          paddingBottom: '1em',
          paddingTop: '1em',
          width: '100%',
        },
        alignItems: 'stretch',
        flexWrap: 'nowrap',
      },
      '.the-button-group.the-button-group-left': {
        justifyContent: 'flex-start',
      },
      '.the-button-group.the-button-group-nowrap': {
        flexWrap: 'nowrap',
      },
      '.the-button-group.the-button-group-right': {
        justifyContent: 'flex-end',
      },
    }),
  )
}

export default TheButtonStyle
