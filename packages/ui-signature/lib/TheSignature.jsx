'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SignaturePad from 'signature_pad/dist/signature_pad'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'

/**
 * Signature pad of the-components
 */
const TheSignature = (props) => {
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
    const devicePixelRatio = get('window.devicePixelRatio') || 1
    const ratio = Math.max(devicePixelRatio, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    const ctx = canvas.getContext('2d')
    canvas.dataset.scaleRatio = ratio
    ctx.scale(ratio, ratio)

    applyValue(newValue)
  }, [pad])

  const syncPad = useCallback(() => {
    if (!pad) {
      return
    }
    pad.penColor = color
  }, [pad, color])

  useEffect(() => {
    const { current: canvas } = canvasRef
    const newPad = new SignaturePad(canvas, {
      onBegin: () => handlePadBegin(newPad),
      onEnd: () => handleEnd(newPad),
    })
    setPad(newPad)

    onPad && onPad(newPad)
    newPad.on()

    const window = get('window')
    window.addEventListener('resize', resize)
    return () => {
      newPad.off()
      window.removeEventListener('resize', resize)
      setPad(null)
    }
  }, [])

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
    >
      <canvas
        className='the-signature-canvas'
        ref={canvasRef}
        style={{ height, width }}
      />
      {children}
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
