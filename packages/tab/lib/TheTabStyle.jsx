'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from 'the-component-util'
import { TheStyle } from 'the-style'

/** Style for TheTab */
const TheTabStyle = ({ className, id, options }) => (
  <TheStyle {...{ id }}
            className={c('the-tab-style', className)}
            styles={TheTabStyle.data(options)}
  />
)

TheTabStyle.displayName = 'TheTabStyle'
TheTabStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheTabStyle.defaultProps = {
  options: {},
}

TheTabStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    backgroundColor = ThemeValues.backgroundColor,
    dominantColor = ThemeValues.dominantColor,
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
    textColor = ThemeValues.textColor,
    transitionDuration = 100,
  } = options
  return asStyleData({
    '.the-tab': {},
    '.the-tab-body': {
      backgroundColor,
      border: `1px solid ${lightBorderColor}`,
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      transition: `height ${transitionDuration}`,
      width: '100%',
      zIndex: 2,
    },
    '.the-tab-body-inner': {
      '&.react-draggable-dragging': {
        transition: 'none',
      },
      '&.the-tab-body-inner-animating': {
        transition: `transform ${transitionDuration}ms`,
      },
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      display: 'flex',
      marginTop: '-1px',
      position: 'relative',
    },
    '.the-tab-button': {
      '.the-tab-button-active-bar': {
        background: dominantColor,
        bottom: 0,
        display: 'block',
        height: '2px',
        left: 0,
        position: 'absolute',
        right: 0,
        transition: `transform ${transitionDuration}ms`,
        zIndex: 2,
      },
      '&:active': {
        boxShadow: 'none',
      },
      '&:hover': {
        boxShadow: 'none',
        color: textColor,
      },
      '&.the-tab-button-active': {
        color: dominantColor,
        cursor: 'default',
        opacity: 1,
        overflow: 'visible',
      },
      backgroundColor,
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      color: lightTextColor,
      cursor: 'pointer',
      fontSize: 'small',
      lineHeight: '1em',
      margin: '0',
      minHeight: '24px',
      overflow: 'hidden',
      padding: '12px 4px',
      position: 'relative',
      textOverflow: 'ellipses',
      whiteSpace: 'nowrap',
      width: '100%',
    },
    '.the-tab-content': {
      '&:first-child': {
        borderLeft: 'none',
      },
      '&:last-child': {
        borderRight: 'none',
      },
      border: `1px solid ${lightBorderColor}`,
      borderBottom: 'none',
      borderTop: 'none',
      boxSizing: 'border-box',
      marginRight: '-1px',
      padding: '8px',
      position: 'relative',
      transition: `height ${transitionDuration}ms`,
      width: '100%',
    },
    '.the-tab-content-wrap': {
      flexShrink: 0,
      width: '100%',
    },
    '.the-tab-header': {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'nowrap',
      marginBottom: '-24px',
      overflowX: 'auto',
      padding: '0 0 24px',
      width: '100%',
    },
  })
}

export default TheTabStyle
