'use strict'

import { asStyleData, colorAlpha } from 'the-component-util'

function PositionInputStyleData({
  dominantColor,
  inputBorderColor,
  targetSize = 92,
}) {
  const displayZIndex = 999
  const barWidth = 2
  const targetBoxShadow = ({ opacity = 0.9 }) =>
    `0 0 0 9999px rgba(255,255,255,${opacity}), 0 0 4px rgba(0,0,0,0.33) inset`
  return asStyleData({
    '.the-map-position-input': {
      '&:hover': {
        '.the-map-position-input-target': {
          boxShadow: targetBoxShadow({ opacity: 0.98 }),
        },
      },
      border: `1px solid ${inputBorderColor}`,
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative',
    },
    '.the-map-position-input-display': {
      color: '#AAA',
      display: 'block',
      fontSize: 'x-small',
      fontStyle: 'italic',
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      top: `calc( 50% - ${targetSize / 2 + 16}px )`,
      width: '100%',
      zIndex: displayZIndex + 2,
    },
    '.the-map-position-input-input': {
      display: 'none',
    },
    '.the-map-position-input-target': {
      alignItems: 'center',
      background: 'transparent',
      border: `4px solid ${dominantColor}`,
      borderRadius: '50%',
      boxShadow: targetBoxShadow({ opacity: 0.9 }),
      display: 'flex',
      height: targetSize,
      justifyContent: 'center',
      left: `calc( 50% - ${targetSize / 2}px )`,
      pointerEvents: 'none',
      position: 'absolute',
      top: `calc( 50% - ${targetSize / 2}px )`,
      width: targetSize,
      zIndex: displayZIndex,
    },
    '.the-map-position-input-target-bar1': {
      background: colorAlpha(dominantColor, 0.66),
      bottom: 0,
      display: 'block',
      height: '100%',
      left: `calc(50% - ${barWidth / 2}px)`,
      position: 'absolute',
      top: 0,
      width: `${barWidth}px`,
    },
    '.the-map-position-input-target-bar2': {
      background: colorAlpha(dominantColor, 0.66),
      display: 'block',
      height: `${barWidth}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `calc(50% - ${barWidth / 2}px)`,
      width: '100%',
    },
    '.the-map-position-input-target-dot': {
      background: colorAlpha(dominantColor, 1),
      border: `1px solid ${dominantColor}`,
      borderRadius: '50%',
      boxSizing: 'border-box',
      display: 'block',
      height: '4px',
      width: '4px',
    },
    '.the-map-position-input-values': {
      display: 'flex',
      flexWrap: 'wrap',
    },
  })
}

export default PositionInputStyleData
