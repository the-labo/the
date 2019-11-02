'use strict'

import { asStyleData } from '@the-/util-ui'

function TextStyleData({
  backgroundColor,
  contentPadding,
  contentWidth,
  dominantColor,
  inputBorderColor,
  inputShadowColor,
  lightBorderColor,
  tappableHeight,
}) {
  return asStyleData({
    '.the-input-text': {
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: '0 4px',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-text-input': {
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '2px',
      boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
      boxSizing: 'border-box',
      display: 'block',
      minHeight: '28px',
      outlineColor: dominantColor,
      padding: '4px 8px',
      width: '100%',
    },
    '.the-input-text-input-wrap': {
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'stretch',
      whiteSpace: 'nowrap',
    },
    '.the-input-text-option': {
      '&:last-child': {
        borderBottom: 'none',
      },
      '&.the-input-text-option-selected': {
        backgroundColor: dominantColor,
      },
      alignItems: 'center',
      backgroundColor,
      borderBottom: `1px solid ${lightBorderColor}`,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      minHeight: tappableHeight,
      overflow: 'hidden',
      padding: contentPadding,
      textOverflow: 'ellipsis',
    },
    '.the-input-text-options': {
      backgroundColor,
      border: `1px solid ${lightBorderColor}`,
      borderRadius: '0 0 2px 2px',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
      boxSizing: 'border-box',
      left: 0,
      listStyle: 'none',
      margin: '-1px 0 0',
      maxHeight: '50vh',
      overflow: 'auto',
      padding: 0,
      position: 'absolute',
      right: 0,
      top: '100%',
      zIndex: 8,
    },
  })
}

module.exports = TextStyleData
