'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheMenu */
const TheMenuStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-menu-style', className)}
    id={id}
    styles={TheMenuStyle.data(options)}
  />
)

TheMenuStyle.displayName = 'TheMenuStyle'
TheMenuStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheMenuStyle.defaultProps = {
  options: {},
}

TheMenuStyle.data = (options) => {
  const {
    activeOpacity = ThemeValues.activeOpacity,
    animationDuration = 200,
    backgroundColor = ThemeValues.backgroundColor,
    contentWidth = ThemeValues.contentWidth,
    hoverOpacity = ThemeValues.hoverOpacity,
    lightBorderColor = ThemeValues.lightBorderColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    overlayBorderColor = ThemeValues.overlayBorderColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-menu': {
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        margin: '8px 0',
        maxWidth: contentWidth,
        padding: 0,
      },
      '.the-menu-end': { display: 'none' },
      '.the-menu-item': {
        borderBottom: `1px solid ${lightBorderColor}`,
        cursor: 'pointer',
        margin: 0,
        padding: 0,
      },
      '.the-menu-item-active,.the-menu-item-active:hover,.the-menu-item-active:active': {
        cursor: 'default',
        opacity: 1,
      },
      '.the-menu-item-icon': {},
      '.the-menu-item-inner': {
        alignItems: 'center',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'row',
        lineHeight: '1.25em',
        minHeight: tappableHeight,
        padding: '4px 8px',
        textDecoration: 'none',
      },
      '.the-menu-item-text': {},
      '.the-menu-item:active': {
        opacity: activeOpacity,
      },
      '.the-menu-item:hover': {
        opacity: hoverOpacity,
      },
    }),
    asStyleData({
      '.the-menu.the-menu-grid': {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      '.the-menu.the-menu-grid .ap-menu-end': {
        display: 'inline-block',
        flex: 'auto',
        height: 0,
        opacity: 0,
        pointerEvents: 'none',
        width: 0,
      },
      '.the-menu.the-menu-grid .the-menu-item': {
        border: 'none',
        minWidth: '20%',
      },
      '.the-menu.the-menu-grid .the-menu-item-icon': {
        fontSize: '2em',
      },
      '.the-menu.the-menu-grid .the-menu-item-inner': {
        flexDirection: 'column',
        padding: '16px',
        textDecoration: 'none',
      },
      '.the-menu.the-menu-grid .the-menu-item-text': {
        fontSize: 'smaller',
      },
    }),
    asStyleData({
      '.the-dropdown-menu': {
        display: 'inline-block',
        maxWidth: contentWidth,
        position: 'relative',
      },
      '.the-dropdown-menu .the-menu': {
        margin: 0,
      },
      '.the-dropdown-menu .the-menu-item': {
        marginBottom: '-1px',
        maxHeight: '0em',
        transition: `max-height ${animationDuration}ms`,
      },
      '.the-dropdown-menu-button': {
        '.the-dropdown-menu-button-icon': {
          boxSizing: 'border-box',
          height: '1em',
          textAlign: 'center',
          transform: 'rotate(-180deg)',
          transformOrigin: '50% 50%',
          transition: 'transform 100ms',
          width: '1em',
        },
        '.the-dropdown-menu-button-text': {
          width: '100%',
        },
        '.the-menu-item-text': {
          overflow: 'hidden',
          textOverflow: 'ellipses',
          whiteSpace: 'nowrap',
        },
        '&:active': { opacity: activeOpacity },
        '&:hover': { opacity: hoverOpacity },
        alignItems: 'center',
        borderColor: '#AAA',
        cursor: 'pointer',
        display: 'flex',
        minHeight: '36px',
        padding: '0 4px',
      },
      '.the-dropdown-menu-inner': {
        backgroundColor: overlayBackgroundColor,
        border: '1px solid transparent',
        boxShadow: '0px 0px 0px rgba(0,0,0,0.33)',
        maxWidth: '100vw',
        minWidth: tappableHeight * 3,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        transition: `opacity ${animationDuration}ms, box-shadow ${animationDuration}ms, border-color ${animationDuration}ms`,
        width: 'max-content',
        zIndex: 8,
      },
      '.the-dropdown-menu.the-dropdown-menu-open': {
        '.the-dropdown-menu-button-icon': {
          transform: 'rotate(0deg)',
        },
        '.the-dropdown-menu-inner': {
          borderColor: overlayBorderColor,
          boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
          opacity: 1,
        },
        '.the-menu-item': {
          margin: 0,
          maxHeight: '3em',
        },
      },
      '.the-dropdown-menu.the-dropdown-menu-righted': {
        '.the-dropdown-menu-inner': {
          left: 'auto',
          right: '0',
        },
      },
    }),
  )
}

export default TheMenuStyle
