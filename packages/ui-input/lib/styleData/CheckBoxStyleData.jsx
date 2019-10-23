'use strict'

import { asStyleData } from '@the-/util-ui'

function CheckBoxStyleData({
  activeOpacity,
  backgroundColor,
  contentWidth,
  dominantColor,
  hoverOpacity,
  tappableHeight,
}) {
  return asStyleData({
    '.the-input-checkbox': {
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: '0',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-checkbox-checkbox': {
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
    '.the-input-checkbox-icon': {
      color: dominantColor,
      minWidth: '1em',
    },
    '.the-input-checkbox-inner': {},
    '.the-input-checkbox-item': {
      '&.the-input-checkbox-item-disabled': {
        '.the-input-checkbox-icon': {
          color: 'inherit',
        },
        opacity: '0.5',
        pointerEvents: 'none',
      },
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'inline-flex',
      justifyContent: 'flex-center',
      margin: '0 2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.the-input-checkbox-label': {
      '&:active': { opacity: activeOpacity },
      '&:focus': {
        outlineColor: 'rgb(238, 142, 10)',
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
    '.the-input-checkbox.the-input-checkbox-as-button': {
      '.the-input-checkbox-icon': {
        display: 'none',
      },
      '.the-input-checkbox-inner': {
        display: 'flex',
        flexWrap: 'wrap',
      },
      '.the-input-checkbox-item': {
        background: backgroundColor,
        border: '1px solid #CCC',
        borderRadius: '4px',
        flexGow: '1',
        fontSize: 'smaller',
        margin: '4px',
        textAlign: 'center',
      },
      '.the-input-checkbox-item-checked': {
        backgroundColor: dominantColor,
        borderColor: `${dominantColor}`,
        color: backgroundColor,
      },
      '.the-input-checkbox-label': {
        minHeight: tappableHeight,
        padding: '4px 16px',
        textAlign: 'center',
      },
    },
  })
}

export default CheckBoxStyleData
