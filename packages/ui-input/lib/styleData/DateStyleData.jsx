/**
 * @function TheInputDateStyleData
 */
'use strict'

import { asStyleData } from '@the-/util-ui'

/** @lends DateStyleData */
function DateStyleData({
  contentWidth,
  dominantColor,
  inputBorderColor,
  inputShadowColor,
}) {
  return asStyleData({
    '.the-input-date': {
      boxSizing: 'border-box',
      display: 'inline-block',
      margin: '0 4px',
      maxWidth: contentWidth,
      position: 'relative',
      verticalAlign: 'middle',
    },
    '.the-input-date-input': {
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '2px',
      boxShadow: `1px 1px 1px ${inputShadowColor} inset`,
      boxSizing: 'border-box',
      display: 'block',
      lineHeight: '20px',
      maxWidth: '100%',
      minHeight: '28px',
      outlineColor: dominantColor,
      padding: '4px 8px',
      width: 'auto',
    },
  })
}

export default DateStyleData
