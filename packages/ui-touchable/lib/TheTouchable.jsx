'use strict'

import Hammer from 'hammerjs'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const parsePanEvent = (e) => {
  const { center, deltaX, deltaY, srcEvent } = e
  return { center, srcEvent, vx: deltaX, vy: deltaY }
}
const parsePinchEvent = (e) => {
  const { center, scale, srcEvent } = e
  return { center, scale, srcEvent }
}

/**
 * Touchable component
 * @memberof module:@the-/ui-touchable
 * @class TheTouchable
 */
const TheTouchable = (props) => {
  const {
    children,
    onPan,
    onPanCancel,
    onPanEnd,
    onPanStart,
    onPinch,
    onPinchEnd,
    onPinchStart,
    pan: panEnabled,
    pinch: pinchEnabled,
  } = props
  const ref = useRef(null)
  const [hammer, setHammer] = useState(null)

  const listeners = useMemo(
    () => ({
      pancancel: (e) => {
        onPanCancel && onPanCancel(parsePanEvent(e))
      },
      panend: (e) => {
        onPanEnd && onPanEnd(parsePanEvent(e))
      },
      panmove: (e) => {
        onPan && onPan(parsePanEvent(e))
      },
      panstart: (e) => {
        onPanStart && onPanStart(parsePanEvent(e))
      },
      pinchend: (e) => {
        onPinchEnd && onPinchEnd(parsePinchEvent(e))
      },
      pinchin: (e) => {
        onPinch && onPinch(parsePinchEvent(e))
      },
      pinchout: (e) => {
        onPinch && onPinch(parsePinchEvent(e))
      },
      pinchstart: (e) => {
        onPinchStart && onPinchStart(parsePinchEvent(e))
      },
    }),
    [onPan, onPinch],
  )
  useEffect(() => {
    const { current: elm } = ref
    const newHammer = Hammer(elm, {})
    setHammer(newHammer)
  }, [])

  useEffect(() => {
    if (!hammer) {
      return
    }
    const pan = hammer.get('pan')
    pan.set({
      direction: panEnabled ? Hammer.DIRECTION_ALL : Hammer.DIRECTION_NONE,
    })
    const pinch = hammer.get('pinch')
    pinch.set({ enable: pinchEnabled })

    for (const [event, listener] of Object.entries(listeners)) {
      hammer.on(event, listener)
    }
    return () => {
      for (const [event, listener] of Object.entries(listeners)) {
        hammer.off(event, listener)
      }
    }
  }, [hammer, panEnabled, pinchEnabled, listeners])

  const child = React.Children.only(children)
  return (
    <React.Fragment>
      {React.cloneElement(child, {
        ref,
      })}
    </React.Fragment>
  )
}

TheTouchable.propTypes = {
  onPan: PropTypes.func,
  onPanCancel: PropTypes.func,
  onPanEnd: PropTypes.func,
  onPanStart: PropTypes.func,
  onPinch: PropTypes.func,
  onPinchEnd: PropTypes.func,
  onPinchStart: PropTypes.func,
  pan: PropTypes.bool,
}

TheTouchable.defaultProps = {
  onPan: null,
  onPanCancel: null,
  onPanEnd: null,
  onPanStart: null,
  onPinch: null,
  onPinchEnd: null,
  onPinchStart: null,
  pan: true,
  pinch: false,
}

TheTouchable.displayName = 'TheTouchable'

export default TheTouchable
