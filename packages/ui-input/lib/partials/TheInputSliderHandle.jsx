'use strict'

import React, { useCallback } from 'react'
import Draggable from 'react-draggable'

export default function TheInputSliderHandle(props) {
  const { elmRef, maxX, minX, onMove, shouldMove = true, step, x } = props
  const handleDrag = useCallback(
    (e, { x, y }) => shouldMove && onMove({ x, y }),
    [shouldMove, onMove],
  )
  const handleStart = useCallback(
    (e, { x, y }) => shouldMove && onMove({ x, y }),
    [shouldMove, onMove],
  )
  const handleStop = useCallback(
    (e, { x, y }) => shouldMove && onMove({ x, y }),
    [shouldMove, onMove],
  )
  return (
    <Draggable
      axis='x'
      bounds={{ left: minX, right: maxX }}
      grid={step && [step, step]}
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}
      position={{ x, y: 0 }}
    >
      <div
        className='the-input-slider-handle'
        data-max-x={maxX}
        data-min-x={minX}
        ref={elmRef}
      >
        <div className='the-input-slider-handle-area' />
        <div className='the-input-slider-handle-icon' />
      </div>
    </Draggable>
  )
}
