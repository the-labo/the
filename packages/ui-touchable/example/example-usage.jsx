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

  const [tapData, setTapData] = useState({
    count: 1,
  })

  const boxStyle = (color) => ({
    background: color,
    color: 'white',
    height: 200,
    lienHeight: '200px',
    position: 'relative',
    textAlign: 'center',
    width: 200,
  })

  const panHandlers = useMemo(
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
    }),
    [panData, setPanData],
  )
  const pinchHandlers = useMemo(
    () => ({
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
    [pinchData, setPinchData],
  )
  const tapHandlers = useMemo(
    () => ({
      onTap: () => {
        setTapData({
          ...tapData,
          count: tapData.count + 1,
        })
      },
    }),
    [tapData, setTapData],
  )
  return (
    <div>
      <TheTouchable {...panHandlers}>
        <div
          style={{
            ...boxStyle('#38E'),
            left: panData.x,
            top: panData.y,
            transform: `translate(${panData.vx}px, ${panData.vy}px)`,
          }}
        >
          Pan Me!
        </div>
      </TheTouchable>
      <br />
      <br />

      <TheTouchable {...pinchHandlers}>
        <div
          style={{
            ...boxStyle('#E83'),
            transform: `scale(${pinchData.scale * pinchData.vscale})`,
          }}
        >
          <div>Pinch Me!</div>
          <div>{`vscale:${pinchData.vscale}`}</div>
        </div>
      </TheTouchable>

      <br />
      <br />

      <TheTouchable {...tapHandlers}>
        <div
          style={{
            ...boxStyle('#3E8'),
          }}
        >
          <div>Pinch Me!</div>
          <div>{`count:${tapData.count}`}</div>
        </div>
      </TheTouchable>
    </div>
  )
}
