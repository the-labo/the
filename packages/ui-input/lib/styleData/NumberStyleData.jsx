'use strict'

import { asStyleData } from '@the-/util-component'

function NumberStyleData({ dominantColor }) {
  return asStyleData({
    '.the-input-number': {
      textAlign: 'right',
      width: 'auto',
    },
    '.the-input-number .the-input-text-input': {
      textAlign: 'right',
    },
    '.the-input-number-changer': {
      color: dominantColor,
      cursor: 'pointer',
      display: 'inline-block',
      outlineColor: dominantColor,
      padding: '5px 4px',
      verticalAlign: 'middle',
    },
    '.the-input-number-changer-disabled': {
      color: '#AAA',
      pointerEvents: 'none',
    },
  })
}

export default NumberStyleData
