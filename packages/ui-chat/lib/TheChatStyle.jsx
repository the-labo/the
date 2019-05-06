'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheChat */
const TheChatStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-chat-style', className)}
    styles={TheChatStyle.data(options)}
  />
)

TheChatStyle.displayName = 'TheChatStyle'
TheChatStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheChatStyle.defaultProps = {
  options: {},
}

TheChatStyle.data = (options) => {
  const {
    backgroundColor = ThemeValues.backgroundColor,
    backgroundForLeftText = '#F0F0F0',
    backgroundForRightText = '#808080',
    lightTextColor = ThemeValues.lightTextColor,
    textColor = ThemeValues.textColor,
  } = options
  return asStyleData({
    '.the-chat': {
      background: backgroundColor,
      borderRadius: '2px',
      boxSizing: 'border-box',
      padding: 0,
      position: 'relative',
    },
    '.the-chat-form': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    '.the-chat-form-form': {
      margin: 0,
      padding: 0,
      width: '100%',
    },
    '.the-chat-time-line': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'relative',
    },
    '.the-chat-time-line-alt': {
      color: lightTextColor,
      margin: '8px auto',
      opacity: 0.8,
      padding: '24px 8px',
      textAlign: 'center',
    },
    '.the-chat-time-line-content': {
      background: backgroundColor,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column-reverse',
      padding: '8px 0',
      position: 'relative',
    },
    '.the-chat-time-line-group': {
      display: 'block',
      flex: 0,
      position: 'relative',
    },
    '.the-chat-time-line-group-body': {
      display: 'block',
    },
    '.the-chat-time-line-group-header': {
      display: 'block',
      position: 'sticky',
      textAlign: 'center',
      top: 0,
      zIndex: 1,
    },
    '.the-chat-time-line-group-title': {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '7px',
      color: 'white',
      display: 'inline-block',
      fontSize: '8px',
      fontWeight: 'normal',
      lineHeight: '14px',
      margin: '4px 0',
      padding: '0 8px',
    },
    '.the-chat-time-line-item': {
      '.the-image.the-image-fit .the-image-img': {
        height: 'auto',
        transition: 'none',
      },
      '.the-video .the-video-inner': {
        height: 'auto',
      },
      '.the-video .the-video-video': {},
      alignItems: 'stretch',
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '8px 0',
    },
    '.the-chat-time-line-item-clickable': {
      cursor: 'pointer',
    },
    '.the-chat-time-line-item-col': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: '0',
    },
    '.the-chat-time-line-item-col-spacer': {
      width: '72px',
    },
    '.the-chat-time-line-item-col-state': {
      boxSizing: 'border-box',
      flexShrink: 0,
      fontSize: 'x-small',
      padding: '0 4px',
    },
    '.the-chat-time-line-item-col-who': {
      boxSizing: 'border-box',
      flexShrink: 0,
      fontSize: 'x-small',
      padding: '0 4px',
    },
    '.the-chat-time-line-item-content': {
      marginBottom: '8px',
    },
    '.the-chat-time-line-item-date': {
      lineHeight: '1em',
      marginBottom: '8px',
    },
    '.the-chat-time-line-item-image': {
      borderRadius: '4px',
      maxWidth: '100%',
    },
    '.the-chat-time-line-item-left': {
      '.the-chat-time-line-item-text-tail': {
        left: '-4px',
      },
    },
    '.the-chat-time-line-item-raw': {
      margin: '4px auto',
      textAlign: 'center',
    },
    '.the-chat-time-line-item-right': {
      '.the-chat-time-line-item-text': {
        backgroundColor: backgroundForRightText,
        color: 'white',
        display: 'inline-block',
        textAlign: 'left',
      },
      '.the-chat-time-line-item-text-tail': {
        backgroundColor: backgroundForRightText,
        right: '-4px',
        top: '16px',
      },
      '.the-chat-time-line-item-who-name': {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
      },
      flexDirection: 'row-reverse',
      textAlign: 'right',
    },
    '.the-chat-time-line-item-text': {
      background: backgroundForLeftText,
      borderRadius: '4px',
      boxSizing: 'border-box',
      color: textColor,
      display: 'block',
      fontSize: 'smaller',
      maxWidth: '100%',
      padding: '8px',
      position: 'relative',
      wordWrap: 'break-word',
    },
    '.the-chat-time-line-item-text-tail': {
      backgroundColor: backgroundForLeftText,
      height: '8px',
      position: 'absolute',
      top: '10px',
      transform: 'rotate(45deg)',
      width: '8px',
    },
    '.the-chat-time-line-item-video': {
      borderRadius: '4px',
      maxWidth: '100%',
    },
    '.the-chat-time-line-item-who-image': {
      alignItems: 'center',
      border: '2px solid #CCC',
      borderRadius: '50%',
      display: 'inline-flex',
      justifyContent: 'center',
      margin: '4px',
      maxWidth: '100%',
      overflow: 'hidden',
      textAlign: 'center',
      textOverflow: 'ellipsis',
    },
    '.the-chat-time-line-item-who-name': {
      display: 'inline-block',
      fontSize: 'small',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.the-chat-time-line-scroll': {
      display: 'block',
      height: '100%',
      overflow: 'auto',
    },
    '.the-chat-time-line-spin': {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 4,
    },
  })
}

export default TheChatStyle
