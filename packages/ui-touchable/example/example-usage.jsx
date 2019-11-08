'use strict'

import React, { useMemo, useState } from 'react'
import { TheTouchable } from '@the-/ui-touchable'

export default function ExampleComponent() {
  const [panStyle, setPanStyle] = useState({
    left: 0,
    top: 0,
  })
  const [pinchStyle, setPinchStyle] = useState({
    'data-zoom': 1,
  })

  const handlers = useMemo(
    () => ({
      onPan: ({ vx, vy }) => {
        setPanStyle({ ...panStyle, transform: `translate(${vx}px, ${vy}px)` })
      },
      onPanEnd: ({ vx, vy }) => {
        setPanStyle({
          ...panStyle,
          left: panStyle.left + vx,
          top: panStyle.top + vy,
          transform: 'none',
        })
      },
      onPanStart: () => {},
      onPinch: ({ scale }) => {
        setPinchStyle({
          ...pinchStyle,
          transform: `scale(${scale * pinchStyle['data-zoom']})`,
        })
      },
      onPinchEnd: ({ scale }) => {
        setPinchStyle({
          ...pinchStyle,
          'data-zoom': pinchStyle['data-zoom'] * scale,
          transform: `scale(${scale})`,
        })
      },
    }),
    [panStyle, setPanStyle, pinchStyle, setPinchStyle],
  )
  return (
    <div>
      <TheTouchable
        onPan={handlers.onPan}
        onPanEnd={handlers.onPanEnd}
        onPanStart={handlers.onPanStart}
        pan
      >
        <div
          style={{
            background: '#38E',
            color: 'white',
            height: 100,
            lienHeight: '100px',
            position: 'relative',
            textAlign: 'center',
            width: 100,
            ...panStyle,
          }}
        >
          Pan Me!
        </div>
      </TheTouchable>
      <br />
      <br />
      <br />
      <br />

      <TheTouchable>
        <div
          style={{
            background: '#E83',
            color: 'white',
            height: 100,
            lienHeight: '100px',
            position: 'relative',
            textAlign: 'center',
            width: 100,
            ...pinchStyle,
          }}
        >
          Pinch Me!
        </div>
      </TheTouchable>
    </div>
  )
}
