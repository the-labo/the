'use strict'

import { asStyleData } from '@the-/util-component'

function PinCodeStyleData({ contentWidth, dominantColor }) {
  return asStyleData({
    '.the-input-pin-code': {
      position: 'relative',
    },
    '.the-input-pin-code .the-input-text-input-wrap': {
      height: '1px',
      left: 0,
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      width: '1px',
    },
    '.the-input-pin-code-display': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '4px auto',
      maxWidth: contentWidth,
    },
    '.the-input-pin-code-item': {
      '&.the-input-pin-code-item-selected': {
        outline: `5px auto ${dominantColor}`,
      },
      alignItems: 'center',
      background: 'white',
      border: '1px solid #DDD',
      borderRadius: '9px',
      boxSizing: 'border-box',
      display: 'inline-flex',
      fontSize: '36px',
      height: '64px',
      justifyContent: 'center',
      textAlign: 'center',
      width: '48px',
    },
  })
}

export default PinCodeStyleData
