'use strict'

import Hammer from 'hammerjs'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { unlessProduction } from '@the-/check-env'
import {
  addEventListenersToElm,
  removeEventListenersFromElm,
} from './helpers/domHelper'
import {
  parseGestureEvent,
  parsePanEvent,
  parsePinchEvent,
  parseRotateEvent,
  parseTapEvent,
  parseWheelEvent,
} from './helpers/eventParser'
import {
  bindHammerListeners,
  setHammerPanEnabled,
  setHammerPinchEnabled,
  setHammerRotateEnabled,
} from './helpers/hammerHelper'
import ListenerPipe from './helpers/ListenerPipe'
import { isGestureSupported, isTouchSupported } from './helpers/supportHelper'

const exists = (v) => !!v

/**
 * Touchable component
 * @memberof module:@the-/ui-touchable
 * @class TheTouchable
 */
const TheTouchable = (props) => {
  const {
    children,
    onDoubleTap,
    onPan,
    onPanCancel,
    onPanEnd,
    onPanStart,
    onPinch,
    onPinchCancel,
    onPinchEnd,
    onPinchStart,
    onRotate,
    onRotateCancel,
    onRotateEnd,
    onRotateStart,
    onTap,
  } = props
  const pinchCallbacks = [onPinch, onPinchStart, onPinchEnd, onPinchCancel]
  const panCallbacks = [onPan, onPanCancel, onPanEnd, onPanStart]
  const tapCallbacks = [onTap, onDoubleTap]
  const rotateCallbacks = [onRotate, onRotateStart, onRotateEnd, onRotateCancel]
  const pinchEnabled = pinchCallbacks.some(exists)
  const panEnabled = panCallbacks.some(exists)
  const tapEnabled = tapCallbacks.some(exists)
  const rotateEnabled = rotateCallbacks.some(exists)

  const supportGesture = useMemo(() => isGestureSupported(), [])
  const supportTouch = useMemo(() => isTouchSupported(), [])

  unlessProduction(() => {
    const nothingEnabled =
      !pinchEnabled && !panEnabled && !tapEnabled && !rotateEnabled
    nothingEnabled &&
      console.warn('[TheTouchable] Nothing to do. May be you forgot pass props')
  })
  const ref = useRef(null)
  const [hammer, setHammer] = useState(null)
  const bindListeners = useCallback(
    (listeners) => bindHammerListeners(hammer, listeners),
    [hammer],
  )

  useEffect(() => {
    const { current: elm } = ref
    if (!elm) {
      return
    }
    const newHammer = Hammer(elm, {})
    setHammer(newHammer)
    return () => {}
  }, [ref.current])

  useEffect(() => {
    if (!hammer) {
      return
    }

    setHammerPanEnabled(hammer, panEnabled)
    if (!panEnabled) {
      return
    }

    const listeners = ListenerPipe(parsePanEvent).pipeAll({
      pancancel: onPanCancel,
      panend: onPanEnd,
      panmove: onPan,
      panstart: onPanStart,
    })
    const unbindListeners = bindListeners(listeners)
    return () => {
      unbindListeners()
    }
  }, [hammer, panEnabled, bindListeners, ...panCallbacks])

  useEffect(() => {
    if (!hammer) {
      return
    }

    setHammerPinchEnabled(hammer, pinchEnabled)
    if (!pinchEnabled) {
      return
    }

    const listeners = ListenerPipe(parsePinchEvent).pipeAll({
      pinchcancel: onPinchCancel,
      pinchend: onPinchEnd,
      pinchin: onPinch,
      pinchout: onPinch,
      pinchstart: onPinchStart,
    })
    const unbindListeners = bindListeners(listeners)

    return () => {
      unbindListeners()
    }
  }, [hammer, pinchEnabled, bindListeners, ...pinchCallbacks])

  const wheelScaleState = useMemo(
    () => ({
      active: false,
      doneTimer: -1,
      scale: 1,
    }),
    [],
  )
  const handleWheel = useCallback(
    (e) => {
      if (!e.ctrlKey) {
        return
      }

      e.preventDefault()

      clearTimeout(wheelScaleState.doneTimer)
      const event = parseWheelEvent(e, {
        scale: wheelScaleState.scale,
      })

      if (!wheelScaleState.active) {
        wheelScaleState.active = true
        onPinchStart && onPinchStart(event)
        return
      }

      wheelScaleState.scale -= e.deltaY * 0.01
      onPinch && onPinch(event)
      const done = () => {
        onPinchEnd && onPinchEnd(event)
        wheelScaleState.scale = 1
        wheelScaleState.active = false
      }
      wheelScaleState.doneTimer = setTimeout(done, 300)
      return () => {
        clearTimeout(wheelScaleState.doneTimer)
      }
    },
    [wheelScaleState, ...pinchCallbacks],
  )

  useEffect(() => {
    if (!pinchEnabled) {
      return
    }

    const { current: elm } = ref
    if (!elm) {
      return
    }
    elm.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      elm.removeEventListener('wheel', handleWheel, { passive: false })
    }
  }, [pinchEnabled, wheelScaleState, handleWheel, ref.current])

  useEffect(() => {
    const useGesture = pinchEnabled && supportGesture && !supportTouch
    if (!useGesture) {
      return
    }

    const { current: elm } = ref
    if (!elm) {
      return null
    }
    const listeners = {
      gesturechange: (e) => {
        onPinch && onPinch(parseGestureEvent(e, { scale: e.scale }))
        e.preventDefault()
      },
      gestureend: (e) => {
        onPinchEnd && onPinchEnd(parseGestureEvent(e, { scale: e.scale }))
        e.preventDefault()
      },
      gesturestart: (e) => {
        onPinchStart && onPinchStart(parseGestureEvent(e, { scale: e.scale }))
        e.preventDefault()
      },
    }
    const opt = { passive: false }
    addEventListenersToElm(elm, listeners, opt)
    return () => {
      removeEventListenersFromElm(elm, listeners, opt)
    }
  }, [ref.current, supportGesture, pinchEnabled, ...pinchCallbacks])

  useEffect(() => {
    if (!hammer) {
      return
    }

    if (!tapEnabled) {
      return
    }

    const listeners = ListenerPipe(parseTapEvent).pipeAll({
      doubletap: onDoubleTap,
      tap: onTap,
    })
    const unbindListeners = bindListeners(listeners)

    return () => {
      unbindListeners()
    }
  }, [hammer, tapEnabled, bindListeners, ...tapCallbacks])

  useEffect(() => {
    if (!hammer) {
      return
    }

    setHammerRotateEnabled(hammer, rotateEnabled)
    if (!rotateEnabled) {
      return
    }

    const listeners = ListenerPipe(parseRotateEvent).pipeAll({
      rotatecancel: onRotateCancel,
      rotateend: onRotateEnd,
      rotatemove: onRotate,
      rotatestart: onRotateStart,
    })

    const unbindListeners = bindListeners(listeners)

    return () => {
      unbindListeners()
    }
  }, [hammer, rotateEnabled, bindListeners, ...rotateCallbacks])

  const child = React.Children.only(children)
  return (
    <>
      {React.cloneElement(child, {
        ref,
      })}
    </>
  )
}

TheTouchable.propTypes = {
  onDoubleTap: PropTypes.func,
  onPan: PropTypes.func,
  onPanCancel: PropTypes.func,
  onPanEnd: PropTypes.func,
  onPanStart: PropTypes.func,
  onPinch: PropTypes.func,
  onPinchCancel: PropTypes.func,
  onPinchEnd: PropTypes.func,
  onPinchStart: PropTypes.func,
  onRotate: PropTypes.func,
  onRotateCancel: PropTypes.func,
  onRotateEnd: PropTypes.func,
  onRotateStart: PropTypes.func,
  onTap: PropTypes.func,
}

TheTouchable.defaultProps = {
  onDoubleTap: null,
  onPan: null,
  onPanCancel: null,
  onPanEnd: null,
  onPanStart: null,
  onPinch: null,
  onPinchCancel: null,
  onPinchEnd: null,
  onPinchStart: null,
  onRotate: null,
  onRotateCancel: null,
  onRotateEnd: null,
  onRotateStart: null,
  onTap: null,
}

TheTouchable.displayName = 'TheTouchable'

export default TheTouchable
