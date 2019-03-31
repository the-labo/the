'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheView */
const TheViewStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-view-style', className)}
    styles={TheViewStyle.data(options)}
  />
)

TheViewStyle.displayName = 'TheViewStyle'
TheViewStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheViewStyle.defaultProps = {
  options: {},
}

TheViewStyle.data = (options) => {
  let {
    backgroundColor = ThemeValues.backgroundColor,
    contentWidth = ThemeValues.contentWidth,
    lightTextColor = ThemeValues.lightTextColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
    overlayBorderColor = ThemeValues.overlayBorderColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options

  const headerHeight = tappableHeight

  return asStyleData({
    '.the-view': {
      backgroundColor,
      flexGlow: 1,
      minHeight: '50vh',
      position: 'relative',
    },
    '.the-view-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      padding: '8px 0',
      width: '100%',
    },
    '.the-view-body-inner': {
      flexGrow: 1,
      width: '100%',
    },
    '.the-view-body-narrow': {
      maxWidth: contentWidth,
    },
    '.the-view-header': {
      '.the-button': {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'inline-flex',
        height: `${headerHeight}px`,
        justifyContent: 'center',
        lineHeight: `${headerHeight}px`,
        margin: '0 4px',
        minWidth: '2em',
        padding: '0 8px',
        whiteSpace: 'nowrap',
      },
      '.the-button-text': {
        fontSize: 'smaller',
      },
      alignItems: 'center',
      backgroundColor: overlayBackgroundColor,
      borderBottom: `1px solid ${overlayBorderColor}`,
      boxSizing: 'border-box',
      margin: '0 auto',
      width: '100%',
    },
    '.the-view-header-button': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.the-view-header-col': {
      '&:nth-child(1)': {
        justifyContent: 'flex-start',
      },
      '&:nth-child(2)': {
        display: 'block',
        maxWidth: contentWidth,
        textAlign: 'center',
        width: '50%',
      },
      '&:nth-child(3)': {
        justifyContent: 'flex-end',
      },
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      minWidth: '25%',
      textAlign: 'center',
    },
    '.the-view-header-icon': {
      flexShrink: 0,
      lineHeight: `${headerHeight}px`,
      verticalAlign: 'middle',
    },
    '.the-view-header-inner': {
      display: 'flex',
      justifyContent: 'space-between',
      lineHeight: `${headerHeight}px`,
    },
    '.the-view-header-narrow': {
      maxWidth: contentWidth,
    },
    '.the-view-header-text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
    '.the-view-header-title': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.the-view-message': {
      color: lightTextColor,
      margin: '16px 0',
      textAlign: 'center',
    },
    '.the-view.the-view-fixed': {
      bottom: 0,
      left: 0,
      overflow: 'auto',
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1,
    },
  })
}

export default TheViewStyle
