'use strict'

import { colorWithAlpha } from '@the-/util-color'
import { asStyleData } from '@the-/util-ui'

function TagStyleData({
  backgroundColor,
  dominantColor,
  inputBorderColor,
  inputShadowColor,
}) {
  return asStyleData({
    '.the-input-tag': {
      alignItems: 'center',
      backgroundColor,
      border: `1px solid ${inputBorderColor}`,
      boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
      boxSizing: 'border-box',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflow: 'auto',
      padding: '4px',
    },
    '.the-input-tag .the-input-text-input': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      flexGrow: 1,
      minWidth: '48px',
      outline: 'none',
      width: 'auto',
    },
    '.the-input-tag-remover': {
      '.the-icon': {
        padding: '0',
      },
      '&:hover': {
        cursor: 'pointer',
      },
      display: 'inline-block',
      padding: '2px',
      verticalAlign: 'middle',
    },
    '.the-input-tag-tag': {
      alignItems: 'center',
      backgroundColor: colorWithAlpha(dominantColor, 0.2),
      borderRadius: '2px',
      color: dominantColor,
      display: 'inline-flex',
      flexGrow: '1',
      fontSize: 'small',
      justifyContent: 'space-between',
      margin: '2px',
      overflow: 'hidden',
      padding: '0 2px',
      position: 'relative',
      zIndex: '1',
    },
    '.the-input-tag-text': {
      display: 'inline-block',
      overflow: 'hidden',
      padding: '2px',
      textOverflow: 'ellipsis',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },
    '.the-input-tag.the-input-tag-focused': {
      outline: `5px auto ${dominantColor}`,
      outlineOffset: '-2px',
    },
  })
}

export default TagStyleData
