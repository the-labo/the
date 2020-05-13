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
    scaleOrigin: { x: 0, y: 0 },
    vscale: 1,
  })

  const [tapData, setTapData] = useState({
    count: 1,
  })

  const [doubleTapData, setDoubleTapData] = useState({
    count: 1,
  })

  const [rotateData, setRotateData] = useState({
    angle: 90,
    vangle: 0,
  })

  const boxStyle = (color) => ({
    background: color,
    boxSizing: 'border-box',
    color: 'white',
    height: 200,
    lienHeight: '200px',
    padding: '20px',
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
          vscale: 1,
        })
      },
      onPinchStart: ({ scaleOrigin }) => {
        setPinchData({
          ...pinchData,
          scaleOrigin,
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

  const doubleTapHandlers = useMemo(
    () => ({
      onDoubleTap: () => {
        setDoubleTapData({
          ...doubleTapData,
          count: doubleTapData.count + 1,
        })
      },
    }),
    [doubleTapData, setDoubleTapData],
  )

  const rotateHandlers = useMemo(
    () => ({
      onRotate: ({ angle }) =>
        setRotateData({
          ...rotateData,
          vangle: angle,
        }),
      onRotateEnd: () =>
        setRotateData({
          ...rotateData,
          angle: rotateData.angle + rotateData.vangle,
          vangle: 0,
        }),
    }),
    [rotateData, setRotateData],
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
          <h3>Pan Me!</h3>
          <p>{JSON.stringify(panData, null, 2)}</p>
        </div>
      </TheTouchable>
      <br />
      <br />

      <TheTouchable {...pinchHandlers}>
        <div
          style={{
            ...boxStyle('#E83'),
            transform: `scale(${pinchData.scale * pinchData.vscale})`,
            transformOrigin: `${pinchData.scaleOrigin.x}px ${pinchData.scaleOrigin.y}px`,
          }}
        >
          <h3>Pinch Me!</h3>
          <p>{JSON.stringify(pinchData, null, 2)}</p>
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
          <h3>Tap Me!</h3>
          <p>{JSON.stringify(tapData, null, 2)}</p>
        </div>
      </TheTouchable>
      <br />
      <TheTouchable {...doubleTapHandlers}>
        <div
          style={{
            ...boxStyle('#E33'),
          }}
        >
          <h3>Double Tap Me!</h3>
          <p>{JSON.stringify(doubleTapData, null, 2)}</p>
        </div>
      </TheTouchable>

      <br />
      <TheTouchable {...rotateHandlers}>
        <div
          style={{
            ...boxStyle('#AA3'),
            transform: `rotate(${
              rotateData.angle + rotateData.vangle - 90
            }deg)`,
          }}
        >
          <h3>Rotate Me!</h3>
          <p>{JSON.stringify(rotateData, null, 2)}</p>
        </div>
      </TheTouchable>
    </div>
  )
}
