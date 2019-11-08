'use strict'

import React, { useMemo, useState } from 'react'
import { TheTouchable } from '@the-/ui-touchable'

export default function ExampleComponent() {
  const [panData, setPanData] = useState({
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
  })
  const [pinchData, setPinchData] = useState({
    scale: 1,
    vscale: 1,
  })

  const handlers = useMemo(
    () => ({
      onPan: ({ vx, vy }) => {
        setPanData({
          ...panData,
          vx,
          vy,
        })
      },
      onPanEnd: ({ vx, vy }) => {
        setPanData({
          ...panData,
          vx: 0,
          vy: 0,
          x: panData.x + vx,
          y: panData.y + vy,
        })
      },
      onPanStart: () => {},
      onPinch: ({ scale }) => {
        setPinchData({
          ...pinchData,
          vscale: scale,
        })
      },
      onPinchEnd: ({ scale }) => {
        setPinchData({
          ...pinchData,
          scale: pinchData.scale * scale,
        })
      },
    }),
    [panData, setPanData, pinchData, setPinchData],
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
            left: panData.x,
            lienHeight: '100px',
            position: 'relative',
            textAlign: 'center',
            top: panData.y,
            transform: `translate(${panData.vx}px, ${panData.vy}px)`,
            width: 100,
          }}
        >
          Pan Me!
        </div>
      </TheTouchable>
      <br />
      <br />
      <br />
      <br />

      <TheTouchable pan={false} pinch>
        <div
          style={{
            background: '#E83',
            color: 'white',
            height: 100,
            lienHeight: '100px',
            position: 'relative',
            textAlign: 'center',
            transform: `scale(${pinchData.scale * pinchData.vscale})`,
            width: 100,
          }}
        >
          Pinch Me!
        </div>
      </TheTouchable>
    </div>
  )
}
