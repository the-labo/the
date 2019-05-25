'use strict'

import { asStyleData } from '@the-/util-ui'

function ToggleStyleData({
  animationDuration,
  backgroundColor,
  dominantColor,
  inputBorderColor,
  offLabelBackgroundColor,
  toggleHandleSize,
}) {
  return asStyleData({
    '.the-input-toggle': {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
    },
    '.the-input-toggle-handle': {
      backgroundColor: 'white',
      border: `1px solid ${inputBorderColor}`,
      borderRadius: '50%',
      display: 'inline-block',
      flexGrow: 0,
      flexShrink: 0,
      height: toggleHandleSize,
      position: 'relative',
      width: toggleHandleSize,
      zIndex: 4,
    },
    '.the-input-toggle-inner': {
      alignItems: 'center',
      backgroundColor,
      border: `1px solid ${inputBorderColor}`,
      borderRadius: toggleHandleSize / 2 + 1,
      display: 'inline-flex',
      height: toggleHandleSize,
      justifyContent: 'flex-start',
      minWidth: toggleHandleSize * 2 + 2,
      overflow: 'hidden',
      width: '100%',
    },
    '.the-input-toggle-label': {
      boxSizing: 'border-box',
      cursor: 'pointer',
      flexGrow: 1,
      flexShrink: 1,
      fontSize: '14px',
      height: '100%',
      lineHeight: `${toggleHandleSize}px`,
      overflow: 'hidden',
      padding: 0,
      textAlign: 'center',
      textOverflow: 'ellipsis',
      transition: `width ${animationDuration}ms`,
      whiteSpace: 'nowrap',
      width: '100%',
    },
    '.the-input-toggle-label-text': {
      boxSizing: 'border-box',
      display: 'inline-block',
      minWidth: toggleHandleSize * 1.5,
      overflow: 'hidden',
      padding: '0 8px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
    },
    '.the-input-toggle-off-label': {
      background: offLabelBackgroundColor,
      borderRadius: `0 ${toggleHandleSize / 2}px ${toggleHandleSize / 2}px 0`,
      boxShadow: `-2px 0 0 ${toggleHandleSize /
        4}px ${offLabelBackgroundColor}`,
      color: '#AAA',
    },
    '.the-input-toggle-on-label': {
      background: dominantColor,
      borderRadius: `${toggleHandleSize / 2}px 0 0 ${toggleHandleSize / 2}px`,
      boxShadow: `2px 0 0 ${toggleHandleSize / 4}px ${dominantColor}`,
      color: 'white',
    },
    '.the-input-toggle-radio': {
      display: 'none',
    },
    '.the-input-toggle.the-input-toggle-off .the-input-toggle-on-label': {
      width: '0 !important',
    },
    '.the-input-toggle.the-input-toggle-on .the-input-toggle-off-label': {
      width: '0 !important',
    },
  })
}

export default ToggleStyleData
