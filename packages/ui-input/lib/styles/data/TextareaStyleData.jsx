'use strict'

import { asStyleData } from '@the-/util-ui'

function TextareaStyleData({
  contentWidth,
  dominantColor,
  inputBorderColor,
  inputShadowColor,
}) {
  return asStyleData({
    '.the-input-textarea': {
      alignItems: 'stretch',
      boxSizing: 'border-box',
      justifyContent: 'stretch',
      margin: '0 4px',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
      width: '100%',
    },
    '.the-input-textarea-body': {
      display: 'inline-flex',
      width: '100%',
    },
    '.the-input-textarea-input': {
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '2px',
      boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
      boxSizing: 'border-box',
      display: 'block',
      outlineColor: dominantColor,
      padding: '4px 8px',
      resize: 'none',
      width: '100%',
    },
  })
}

export default TextareaStyleData
