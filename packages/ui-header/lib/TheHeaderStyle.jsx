'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'
import { asStyleData } from '@the-/util-component'

/** Style for TheHeader */
const TheHeaderStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-header-style', className)}
    styles={TheHeaderStyle.data(options)}
  />
)

TheHeaderStyle.displayName = 'TheHeaderStyle'
TheHeaderStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheHeaderStyle.defaultProps = {
  options: {},
}

TheHeaderStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    headerHeight = ThemeValues.headerHeight,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    overlayBorderColor = ThemeValues.overlayBorderColor,
    overlayHeaderHeight = 24,
    tabInactiveColor = ThemeValues.tabInactiveColor,
    zIndex = 8,
  } = options
  return asStyleData({
    '.the-header': {
      minHeight: headerHeight,
    },
    '.the-header .the-button': {
      alignItems: 'center',
      display: 'inline-flex',
      fontSize: 'smaller',
      justifyContent: 'center',
      lineHeight: '2em',
      padding: '0.25em 1em',
    },
    '.the-header .the-container': {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      position: 'relative',
    },
    '.the-header-inner': {
      backgroundColor: 'rgba(255,255,255,0.92)',
      borderBottom: `1px solid ${overlayBorderColor}`,
      left: 0,
      minHeight: headerHeight,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex,
    },
    '.the-header-logo': {
      alignItems: 'center',
      boxSizing: 'border-box',
      color: 'inherit',
      display: 'inline-flex',
      height: headerHeight,
      lineHeight: `${headerHeight}px`,
      margin: '0 8px',
      padding: '0 4px',
      textDecoration: 'none',
    },
    '.the-header-notice': {
      backgroundColor: '#333',
      color: '#999',
      display: 'flex',
      fontSize: 'small',
    },
    '.the-header-notice-actions': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '4px',
    },
    '.the-header-notice-button': {
      lineHeight: 'inherit',
      margin: 0,
      minHeight: '18px',
      overflow: 'hidden',
      padding: '4px 8px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.the-header-notice-inner.the-container': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      width: '100%',
    },
    '.the-header-notice-message': {
      '&:hover': {
        overflow: 'visible',
      },
      display: 'block',
      overflow: 'hidden',
      padding: '4px 8px',
      textOverflow: 'ellipsis',
      transition: 'width 300ms',
      whiteSpace: 'nowrap',
    },
    '.the-header-notices-wrap': {
      '&.the-header-notices-wrap-empty': {
        height: '0 !important',
        overflow: 'hidden',
      },
      display: 'block',
      margin: 0,
      padding: 0,
      transition: 'height 400ms',
    },
    '.the-header-ribbon': {
      '&:hover': {
        display: 'none',
      },
      backgroundColor: dominantColor,
      boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
      color: 'white',
      display: 'block',
      fontSize: '9px',
      left: '0',
      opacity: 0.66,
      padding: '1px 2px',
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      top: '76px',
      transform: 'rotate(-45deg)',
      transformOrigin: '0 100%',
      width: '128px',
      zIndex: 4,
    },
    '.the-header-right-area': {
      alignItems: 'center',
      display: 'flex',
      height: headerHeight,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '.the-header-tab': {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'flex-start',
      listStyle: 'none',
      margin: '0 -16px',
      minWidth: contentWidth / 2,
      padding: '0 8px',
    },
    '.the-header-tab-item': {
      '.the-link,a': {
        '&.the-link-active': {
          borderBottomColor: dominantColor,
          color: dominantColor,
        },
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        boxSizing: 'border-box',
        color: tabInactiveColor,
        display: 'inline-flex',
        fontSize: 'smaller',
        height: headerHeight,
        lineHeight: `${headerHeight}px`,
        maxWidth: '100%',
        padding: '0 8px',
        textDecoration: 'none',
        wordBreak: 'keep-all',
      },
      display: 'inline-block',
      margin: '0 8px',
      padding: 0,
    },
    '.the-header-tab-item-text,.the-header-tab-item-children': {
      overflow: 'hidden',
      textOverflow: 'ellipses',
      whiteSpace: 'nowrap',
    },
    '.the-header.the-header-as-overlay': {
      '.the-button': {
        height: 'auto',
        lineHeight: `${overlayHeaderHeight - 4.5}px`,
        margin: '0 8px',
        minHeight: 0,
        padding: '0 1em',
      },
      '.the-container': {
        maxWidth: 'none',
      },
      '.the-dropdown-menu-inner': {
        background: 'none',
      },
      '.the-header-inner': {
        background: 'rgba(255, 255, 255, 0.66)',
        border: 'none',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.33)',
        minHeight: 0,
        padding: 0,
        zIndex: 666,
      },
      '.the-header-logo': {
        height: overlayHeaderHeight,
        lineHeight: `${overlayHeaderHeight}px`,
        padding: '0 9px',
      },
      '.the-header-right-area': {
        bottom: 0,
        height: 'auto',
      },
      '.the-header-tab-item': {
        '.the-link,a': {
          alignItems: 'center',
          display: 'inline-flex',
          height: overlayHeaderHeight,
          justifyContent: 'center',
          lineHeight: `${overlayHeaderHeight}px`,
        },
      },
      minHeight: '0 !important',
    },
    '.the-header.the-header-as-static': {
      '.the-header-inner': {
        position: 'static',
      },
    },
    '.the-header.the-header-reversed': {
      '.the-dropdown-menu': {
        color: '#333',
      },
      '.the-header-inner': {
        '.the-header-tab-item': {
          '.the-link': {
            color: 'white',
            opacity: 0.8,
          },
          '.the-link-active': {
            borderBottomColor: 'white',
            opacity: 1,
          },
        },
        background: dominantColor,
        color: 'white',
      },
    },
  })
}

export default TheHeaderStyle
