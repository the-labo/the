'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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

  const reloadPad = useCallback(()=>{
    const { current: canvas } = canvasRef
    let resumeTouchScrolling = null
    const newPad = new SignaturePad(canvas, {
      onBegin: () => {
        handlePadBegin(newPad)
        resumeTouchScrolling && resumeTouchScrolling()
        resumeTouchScrolling = stopTouchScrolling()
      },
      onEnd: () => {
        handleEnd(newPad)
        resumeTouchScrolling && resumeTouchScrolling()
      },
    })
    setPad(newPad)

    onPad && onPad(newPad)
    newPad.on()

    return () => {
      newPad.off()
      setPad(null)
      resumeTouchScrolling && resumeTouchScrolling()
    }
  }, [canvasRef])

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

  const applyValue = useCallback(
    (value) => {
      if (!pad) {
        return null
      }

      pad.fromDataURL(value)
    },
    [pad],
  )

  const resize = useCallback(() => {
    const { current: canvas } = canvasRef
    const skip = !canvas || !pad
    if (skip) {
      return
    }
    const newValue = pad.toDataURL()
    applyValue(newValue)
    const timer = setTimeout(()=> {
      reloadPad()
    }, 300)
    return () => {
      clearTimeout(timer)
    }

  }, [pad, reloadPad])

  const syncPad = useCallback(() => {
    if (!pad) {
      return
    }

    pad.penColor = color
  }, [pad, color])


  useEffect(() => {
    const clear = reloadPad()
    return () => {
      clear()
    }
  }, [reloadPad])

  useEffect(() => {
    const window = get('window')
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      setPad(null)
    }
  }, [resize])
  useEffect(() => {
    const { current: canvas } = canvasRef
    const devicePixelRatio = get('window.devicePixelRatio') || 1
    const ratio = Math.max(devicePixelRatio, 1)
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.dataset.scaleRatio = ratio
    ctx.scale(ratio, ratio)
  }, [canvasRef])
  useEffect(() => {
    syncPad()
  }, [color])
  useEffect(() => {
    applyValue(value)
  }, [value])
  useEffect(() => {
    resize()
  }, [width, height])
  useEffect(() => {
    resize()
  }, [pad])

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
