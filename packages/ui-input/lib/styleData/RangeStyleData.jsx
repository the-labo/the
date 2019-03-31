'use strict'

import { asStyleData } from '@the-/util-component'

function RangeStyleData({
  dominantColor,
  handlePaddingRate,
  sliderBarHeight,
  sliderHandleSize,
  sliderPadding,
}) {
  return asStyleData({
    '.the-input-range': {
      height: `${sliderHandleSize + 2}px`,
      position: 'relative',
    },
    '.the-input-range-bar': {
      height: `${sliderBarHeight + sliderPadding}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `${sliderHandleSize / 2 - sliderPadding}px`,
    },
    '.the-input-range-bar-bg': {
      backgroundColor: '#CCC',
      border: '1px solid #BBB',
      borderRadius: sliderBarHeight / 2,
      height: `${sliderBarHeight}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `${sliderPadding}px`,
    },
    '.the-input-range-bar-highlight': {
      backgroundColor: dominantColor,
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: sliderBarHeight / 2,
      height: sliderBarHeight,
      maxWidth: '100%',
      position: 'absolute',
      top: sliderPadding,
    },
    '.the-input-range-bar-tap': {
      bottom: -8,
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: -8,
      zIndex: 1,
    },
    '.the-input-range-bar-wrap': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'relative',
      textAlign: 'left',
      width: '100%',
    },
    '.the-input-range-handle': {
      '&:active': {
        cursor: '-webkit-grabbing',
        zIndex: 5,
      },
      borderRadius: '50%',
      cursor: '-webkit-grab',
      display: 'inline-block',
      left: 0,
      position: 'absolute',
      zIndex: 4,
    },
    '.the-input-range-handle-area': {
      bottom: `${handlePaddingRate}%`,
      color: 'transparent',
      display: 'inline-block',
      left: `${handlePaddingRate}%`,
      opacity: 0,
      position: 'absolute',
      right: `${handlePaddingRate}%`,
      top: `${handlePaddingRate}%`,
    },
    '.the-input-range-handle-icon': {
      '.the-input-range-label': {
        boxSizing: 'border-box',
        display: 'inline-block',
        fontSize: '14px',
        lineHeight: `${sliderHandleSize}px`,
        minWidth: '24px',
        padding: '2px 4px',
        textAlign: 'right',
      },
      '&:hover': {
        boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
      },
      backgroundColor: 'white',
      border: '1px solid #DDD',
      borderRadius: '50%',
      boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      display: 'inline-block',
      height: `${sliderHandleSize}px`,
      position: 'relative',
      width: `${sliderHandleSize}px`,
      zIndex: 3,
    },
    '.the-input-range-inner': {
      display: 'flex',
      margin: '2px 0',
    },
  })
}

export default RangeStyleData
