'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheDialog */
const TheDialogStyle = ({ className, id, options = {} }) => (
  <TheStyle
    {...{ id }}
    className={c('the-dialog-style', className)}
    styles={TheDialogStyle.data(options)}
  />
)

TheDialogStyle.displayName = 'TheDialogStyle'
TheDialogStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheDialogStyle.defaultProps = {
  options: {},
}

TheDialogStyle.data = (options) => {
  const {
    buttonHeight = 40,
    contentWidth = ThemeValues.contentWidth,
    dominantColor = ThemeValues.dominantColor,
    footerHeight = 44,
    headerHeight = ThemeValues.headerHeight,
    lightBorderColor = ThemeValues.lightBorderColor,
    overlayBackgroundColor = ThemeValues.overlayBackgroundColor,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-confirm-dialog-action': {
        padding: '8px 0',
        textAlign: 'center',
      },
      '.the-confirm-dialog-checkbox': {
        margin: 0,
      },
      '.the-confirm-dialog-content': {
        minHeight: '72px',
      },
      '.the-confirm-dialog-submit': {},
      '.the-dialog': {
        backgroundColor: 'transparent',
        bottom: 0,
        display: 'none',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 99,
      },
      '.the-dialog-back': {
        backgroundColor: 'rgba(0,0,0,0.33)',
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
      '.the-dialog-back-inner': {
        boxSizing: 'border-box',
        display: 'block',
        height: '100%',
        width: '100%',
      },
      '.the-dialog-body': {
        boxSizing: 'border-box',
        height: 'auto',
        maxHeight: '100%',
        overflow: 'auto',
        padding: `${headerHeight + 8}px 16px 8px`,
        width: '100%',
      },
      '.the-dialog-body-for-footer': {
        paddingBottom: footerHeight + 8,
      },
      '.the-dialog-close-button': {
        alignItems: 'center',
        bottom: 0,
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: '16px',
        justifyContent: 'center',
        lineHeight: `${headerHeight}px`,
        padding: '0 16px',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 44,
      },
      '.the-dialog-close-button-icon': {
        lineHeight: `${headerHeight}px`,
      },
      '.the-dialog-close-button:active': {
        opacity: 0.6,
      },
      '.the-dialog-close-button:hover': {
        opacity: 0.9,
      },
      '.the-dialog-content': {
        backgroundColor: '#FFF',
        border: '1px solid #DDD',
        borderRadius: '8px',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.3)',
        boxSizing: 'border-box',
        height: 'auto',
        margin: '0 auto',
        maxHeight: 'calc(100vh - 72px)',
        maxWidth: contentWidth,
        minHeight: '124px',
        overflow: 'auto',
        position: 'relative',
        width: '100%',
        zIndex: 8,
      },
      '.the-dialog-footer': {},
      '.the-dialog-footer-inner': {
        alignItems: 'center',
        backgroundColor: overlayBackgroundColor,
        borderTop: `1px solid ${lightBorderColor}`,
        bottom: 0,
        boxSizing: 'border-box',
        display: 'flex',
        height: footerHeight,
        justifyContent: 'flex-end',
        left: 0,
        lineHeight: `${footerHeight}px`,
        overflowX: 'hidden',
        padding: '0 8px',
        position: 'absolute',
        right: 0,
      },
      '.the-dialog-header': {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderBottom: '1px solid #F5F5F5',
        boxSizing: 'border-box',
        display: 'block',
        height: `${headerHeight}px`,
        left: 0,
        lineHeight: `${headerHeight}px`,
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0,
        zIndex: 2,
      },
      '.the-dialog-inner': {
        boxSizing: 'border-box',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: '36px 24px',
        position: 'relative',
        width: '100%',
        zIndex: 4,
      },
      '.the-dialog-lead': {},
      '.the-dialog-spinner': {
        background: overlayBackgroundColor,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 99,
      },
      '.the-dialog-title': {
        '.the-icon': {},
        alignItems: 'center',
        display: 'inline-flex',
        fontWeight: 'normal',
        justifyContent: 'center',
        lineHeight: `${headerHeight}px`,
        margin: 0,
        overflow: 'hidden',
        padding: 0,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      '.the-dialog.the-dialog-full': {
        '.the-dialog-body': {
          height: '100%',
        },
        '.the-dialog-content': {
          borderRadius: 0,
          bottom: 0,
          left: 0,
          maxHeight: 'none',
          maxWidth: 'none',
          position: 'fixed',
          right: 0,
          top: 0,
        },
      },
      '.the-dialog.the-dialog-present': {
        display: 'block',
      },
      '.the-ok-dialog-button': {
        cursor: 'pointer',
        width: '100%',
      },
      '.the-ok-dialog-control': {
        alignItems: 'center',
        bottom: 0,
        color: dominantColor,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        textAlign: 'center',
        top: 0,
        width: '100%',
      },
      '.the-yes-no-dialog-button': {
        color: `${dominantColor}`,
        display: 'block',
        margin: '0 -1px',
        maxWidth: '50%',
        padding: '4px 16px',
        textAlign: 'center',
      },
      '.the-yes-no-dialog-button-text': {
        boxSizing: 'border-box',
        display: 'inline-block',
        lineHeight: `${buttonHeight}px`,
        width: '100%',
      },
      '.the-yes-no-dialog-button:active': {
        opacity: 0.6,
      },
      '.the-yes-no-dialog-button:hover': {
        cursor: 'pointer',
        opacity: 0.9,
      },
      '.the-yes-no-dialog-control': {
        backgroundColor: 'rgba(255,255,255,0.9)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'flex-end',
        overflowX: 'hidden',
        padding: '0 8px',
      },
    }),
  )
}

export default TheDialogStyle
