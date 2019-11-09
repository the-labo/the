'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  eventHandlersFor,
  htmlAttributesFor,
  stopTouchScrolling,
} from '@the-/util-ui'
import { get } from '@the-/window'
import DrawConfigs from './constants/DrawConfigs'
import DrawingMethods from './constants/DrawingMethods'
import Drawer from './helpers/Drawer'
import ThePaintStyle from './ThePaintStyle'

const isMultiTouch = (e) => e.touches && e.touches.length > 1

/**
 * Hand write painting
 */
const ThePaint = (props) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const tmpCanvasRef = useRef(null)

  const {
    background,
    children,
    className,
    erasing,
    height,
    lineColor,
    lineWidth,
    method,
    onDraw,
    onDrawEnd,
    onDrawer,
    onDrawStart,
    style,
    width,
  } = props

  const [drawer, setDrawer] = useState(null)

  useEffect(() => {
    const newDrawer = new Drawer(canvasRef.current, tmpCanvasRef.current, {
      lineColor,
      lineWidth,
      method,
    })
    newDrawer.resize().then(() => {
      onDrawer && onDrawer(newDrawer)
      setDrawer(newDrawer)
    })
  }, [])

  useEffect(() => {
    const { current: container } = containerRef
    let resumeTouchScrolling = null
    const listeners = {
      touchcancel: () => {
        resumeTouchScrolling && resumeTouchScrolling()
      },
      touchend: () => {
        resumeTouchScrolling && resumeTouchScrolling()
      },
      touchmove: (e) => e.preventDefault(),
      touchstart: () => {
        resumeTouchScrolling = stopTouchScrolling()
      },
    }
    for (const [event, listener] of Object.entries(listeners)) {
      container.addEventListener(event, listener)
    }
    return () => {
      for (const [event, listener] of Object.entries(listeners)) {
        container.removeEventListener(event, listener)
      }
      resumeTouchScrolling && resumeTouchScrolling()
    }
  }, [])

  useEffect(() => {
    if (background) {
      drawer && void drawer.registerBackground(background)
    }
  }, [drawer, background])

  const handleResize = useCallback(() => {
    drawer && drawer.resizeRequest()
  }, [drawer])

  useEffect(() => {
    const window = get('window')
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => handleResize(), [handleResize, width, height])

  const positionForEvent = useCallback(
    (e) => {
      const { current: canvas } = canvasRef
      if (!canvas) {
        return null
      }

      const { left, top } = canvas.getBoundingClientRect()
      const touch = e.touches ? e.touches[0] : e
      if (!touch) {
        return null
      }

      const { clientX, clientY } = touch
      return { x: clientX - left, y: clientY - top }
    },
    [canvasRef.current],
  )

  const handleDraw = useCallback(
    (e) => {
      const active = drawer && drawer.active
      if (!active) {
        return
      }

      if (isMultiTouch(e)) {
        return
      }

      const pos = positionForEvent(e)
      drawer.draw(pos)

      onDraw && onDraw({ drawer, pos })
    },
    [drawer, onDraw],
  )

  useEffect(() => {
    if (!drawer) {
      return
    }
    drawer.setConfig({
      erasing,
      lineColor,
      lineWidth,
      method,
    })
  }, [drawer, lineColor, lineWidth, method, erasing])

  const handleDrawStart = useCallback(
    (e) => {
      const active = drawer && drawer.active
      if (active) {
        return
      }

      const snapshot = drawer.snapshot()
      const pos = positionForEvent(e)
      drawer.start(pos)
      onDrawStart && onDrawStart({ drawer, pos, snapshot })
    },
    [drawer, onDrawStart],
  )

  const handleDrawEnd = useCallback(() => {
    const active = drawer && drawer.active
    if (!active) {
      return
    }

    drawer.end()
    const snapshot = drawer.snapshot()
    onDrawEnd && onDrawEnd({ drawer, snapshot })
  }, [drawer, onDrawEnd])

  const canvasStyle = { height, width }
  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['className', 'width', 'height', 'style'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-paint', className)}
      style={{ ...(style || {}), height, width }}
    >
      {children}
      <div
        className='the-paint-canvas-container'
        onMouseDown={handleDrawStart}
        onMouseLeave={handleDrawEnd}
        onMouseMove={handleDraw}
        onMouseUp={handleDrawEnd}
        onTouchCancel={handleDrawEnd}
        onTouchEnd={handleDrawEnd}
        onTouchMove={handleDraw}
        onTouchStart={handleDrawStart}
        ref={containerRef}
      >
        <canvas
          className='the-paint-canvas'
          ref={canvasRef}
          style={canvasStyle}
        />
        <canvas
          className='the-paint-tmp-canvas'
          ref={tmpCanvasRef}
          style={canvasStyle}
        />
      </div>
    </div>
  )
}

ThePaint.Style = ThePaintStyle

ThePaint.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Method of drawing */
  method: PropTypes.oneOf(Object.values(DrawingMethods)),
  onDraw: PropTypes.func,
  onDrawEnd: PropTypes.func,
  /** Get drawer ref */
  onDrawer: PropTypes.func,
  onDrawStart: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ThePaint.defaultProps = {
  flushed: null,
  height: 150,
  lineColor: DrawConfigs.DEFAULT_LINE_COLOR,
  lineWidth: DrawConfigs.DEFAULT_LINE_WIDTH,
  method: DrawingMethods.FREE,
  onDrawer: null,
  width: 150,
}

ThePaint.displayName = 'ThePaint'

export default ThePaint
