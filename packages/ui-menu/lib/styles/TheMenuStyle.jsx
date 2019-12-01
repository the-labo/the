'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'
import DropdownStyleData from './data/DropdownStyleData'

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
    DropdownStyleData({
      activeOpacity,
      animationDuration,
      contentWidth,
      hoverOpacity,
      overlayBackgroundColor,
      overlayBorderColor,
      tappableHeight,
    }),
  )
}

export default TheMenuStyle
