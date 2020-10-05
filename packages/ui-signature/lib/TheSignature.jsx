'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SignaturePad from 'signature_pad/dist/signature_pad'
import {
  eventHandlersFor,
  htmlAttributesFor,
  stopTouchScrolling,
} from '@the-/util-ui'
import { get } from '@the-/window'

/**
 * Signature pad of the-components
 */
const TheSignature = (props) => {
  const containerRef = useRef(null)
  const {
    children,
    className,
    color,
    height,
    onBegin,
    onEnd,
    onPad,
    value,
    width,
  } = props
  const canvasRef = useRef(null)
  const [pad, setPad] = useState(null)

  const ratio = useMemo(() => {
    const devicePixelRatio = get('window.devicePixelRatio') || 1
    return Math.max(devicePixelRatio, 1)
  }, [])

  const handlePadBegin = useCallback(
    (pad) => {
      onBegin && onBegin({ pad })
    },
    [onBegin],
  )

  const handleEnd = useCallback(
    (pad) => {
      onEnd && onEnd({ pad })
    },
    [onEnd],
  )

  const updateCanvasSize = useCallback(() => {
    const { current: canvas } = canvasRef
    if (!canvas) return

    const dataCache = pad?.toData()
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
    const timer = setTimeout(() => {
      dataCache && pad?.fromData(dataCache)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [pad, ratio])

  useEffect(() => {
    const { current: canvas } = canvasRef
    if (!canvas) return

    const ResizeObserver = get('ResizeObserver')
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })
    resizeObserver.observe(canvasRef.current)
  }, [canvasRef, updateCanvasSize])

  const reloadPad = useCallback(() => {
    const { current: canvas } = canvasRef
    const newPad = new SignaturePad(canvas)
    setPad(newPad)

    onPad && onPad(newPad)
    newPad.on()

    return () => {
      newPad.off()
      setPad(null)
    }
  }, [canvasRef, onPad])

  const initPad = useCallback(() => {
    if (!pad) return () => {}

    let resumeTouchScrolling = null
    pad.onBegin = () => {
      handlePadBegin(pad)
      resumeTouchScrolling && resumeTouchScrolling()
      resumeTouchScrolling = stopTouchScrolling()
    }
    pad.onEnd = () => {
      handleEnd(pad)
      resumeTouchScrolling && resumeTouchScrolling()
    }
    return () => {
      resumeTouchScrolling && resumeTouchScrolling()
    }
  }, [pad, handlePadBegin, handleEnd])

  useEffect(() => {
    const clear = reloadPad()
    return () => {
      clear()
    }
  }, [reloadPad])

  useEffect(() => {
    updateCanvasSize()
  }, [updateCanvasSize])
  useEffect(() => initPad(), [initPad])
  useEffect(() => {
    if (pad) {
      pad.penColor = color
    }
  }, [pad, color])
  useEffect(() => {
    pad?.fromDataURL(value)
  }, [pad, value])

  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['className', 'width', 'height'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-signature', className)}
      ref={containerRef}
    >
      {children}
      <canvas
        className='the-signature-canvas'
        ref={canvasRef}
        style={{ height, width }}
      />
    </div>
  )
}

TheSignature.propTypes = {
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

TheSignature.defaultProps = {
  color: '#555',
  height: '150px',
  onBegin: () => null,
  onEnd: () => null,
  onPad: () => null,
  width: '100%',
}

TheSignature.displayName = 'TheSignature'

export default TheSignature
