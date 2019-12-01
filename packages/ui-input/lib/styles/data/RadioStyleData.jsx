'use strict'

import { asStyleData } from '@the-/util-ui'

function RadioStyleData({
  activeOpacity,
  backgroundColor,
  contentWidth,
  dominantColor,
  hoverOpacity,
  tappableHeight,
}) {
  return asStyleData({
    '.the-input-radio': {
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: '0',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-radio-icon': {
      color: dominantColor,
    },
    '.the-input-radio-inner': {},
    '.the-input-radio-item': {
      '&.the-input-radio-item-disabled': {
        '.the-input-radio-icon': {
          color: 'inherit',
        },
        opacity: '0.5',
        pointerEvents: 'none',
      },
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'inline-flex',
      justifyContent: 'center',
      margin: '0 2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.the-input-radio-label': {
      '&:active': { opacity: activeOpacity },
      '&:focus': {
        outlineColor: dominantColor,
        outlineOffset: '-2px',
        outlineStyle: 'auto',
        outlineWidth: '5px',
      },
      '&:hover': { opacity: hoverOpacity },
      '> *': {
        // https://github.com/ftlabs/fastclick/issues/60
        pointerEvents: 'none',
      },
      alignItems: 'center',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      padding: '2px 4px',
    },
    '.the-input-radio-radio': {
      height: 1,
      left: 0,
      marginBottom: -1,
      marginRight: -1,
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      visibility: 'hidden',
      width: 1,
      zIndex: -1,
    },
    '.the-input-radio.the-input-radio-as-button': {
      '.the-input-radio-icon': {
        display: 'none',
      },
      '.the-input-radio-item': {
        background: backgroundColor,
        border: '1px solid #CCC',
        borderRadius: '4px',
        fontSize: 'smaller',
        margin: '4px',
        textAlign: 'center',
      },
      '.the-input-radio-item-checked': {
        backgroundColor: dominantColor,
        borderColor: `${dominantColor}`,
        color: backgroundColor,
      },
      '.the-input-radio-label': {
        minHeight: tappableHeight,
        padding: '4px 16px',
      },
    },
    '.the-input-radio.the-input-radio-as-toggle': {
      '.the-input-radio-icon': {
        display: 'none',
      },
      '.the-input-radio-item': {
        '.the-input-radio-label': {
          boxSizing: 'border-box',
          padding: '6px 12px',
        },
        '&:first-child': {
          borderRadius: '4px 0 0 4px',
          marginLeft: '4px',
        },
        '&:last-child': {
          borderRadius: '0 4px 4px 0',
          marginRight: '4px',
        },
        '&.the-input-radio-item-checked': {
          backgroundColor: dominantColor,
          borderWidth: '1px',
          color: backgroundColor,
          position: 'relative',
          zIndex: 1,
        },
        background: backgroundColor,
        border: '1px solid #CCC',
        borderRadius: '0',
        fontSize: 'smaller',
        margin: '4px -1px 4px 0',
        padding: '0',
        textAlign: 'center',
      },
      '.the-input-radio-item-checked': {
        border: `2px solid ${dominantColor}`,
      },
    },
    'the-input-radio-readonly-label': {
      display: 'inline-block',
      margin: '4px 0',
    },
  })
}

export default RadioStyleData
