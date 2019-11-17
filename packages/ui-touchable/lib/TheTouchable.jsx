'use strict'

import Hammer from 'hammerjs'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { unlessProduction } from '@the-/check-env'
import {
  bindHammerListeners,
  setHammerPanEnabled,
  setHammerPinchEnabled,
  setHammerRotateEnabled,
} from './helpers/hammerHelper'

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
    const newHammer = Hammer(elm, {})
    setHammer(newHammer)
  }, [])

  useEffect(() => {
    if (!hammer) {
      return
    }
    setHammerPanEnabled(hammer, panEnabled)
    if (!panEnabled) {
      return
    }
    const listeners = Object.fromEntries(
      [
        ['pancancel', onPanCancel],
        ['panend', onPanEnd],
        ['panmove', onPan],
        ['panstart', onPanStart],
      ]
        .filter(([, handle]) => !!handle)
        .map(([event, handle]) => [
          event,
          (e) => {
            const { center, deltaX, deltaY, srcEvent } = e
            handle({
              center,
              srcEvent,
              vx: deltaX,
              vy: deltaY,
            })
          },
        ]),
    )
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
    const listeners = Object.fromEntries(
      [
        ['pinchin', onPinch],
        ['pinchout', onPinch],
        ['pinchend', onPinchEnd],
        ['pinchstart', onPinchStart],
        ['pinchcancel', onPinchCancel],
      ]
        .filter(([, handle]) => !!handle)
        .map(([event, handle]) => [
          event,
          (e) => {
            const { center, scale, srcEvent } = e
            handle({
              center,
              scale,
              srcEvent,
            })
          },
        ]),
    )
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
  useEffect(() => {
    if (!pinchEnabled) {
      return
    }
    const { current: elm } = ref
    const wheel = (srcEvent) => {
      if (!srcEvent.ctrlKey) {
        return
      }
      srcEvent.preventDefault()

      clearTimeout(wheelScaleState.doneTimer)
      const event = {
        center: {
          x: srcEvent.clientX,
          y: srcEvent.clientY,
        },
        scale: wheelScaleState.scale,
        srcEvent,
      }
      if (!wheelScaleState.active) {
        wheelScaleState.active = true
        onPinchStart && onPinchStart(event)
        return
      }
      wheelScaleState.scale -= srcEvent.deltaY * 0.01
      onPinch && onPinch(event)
      wheelScaleState.doneTimer = setTimeout(() => {
        wheelScaleState.scale = 1
        onPinchEnd && onPinchEnd(event)
      }, 300)
    }
    elm.addEventListener('wheel', wheel, { passive: false })
    return () => {
      clearTimeout(wheelScaleState.doneTimer)
      elm.removeEventListener('wheel', wheel, { passive: false })
    }
  }, [pinchEnabled, wheelScaleState, ...pinchCallbacks])

  useEffect(() => {
    if (!hammer) {
      return
    }
    if (!tapEnabled) {
      return
    }
    const listeners = Object.fromEntries(
      [['tap', onTap], ['doubletap', onDoubleTap]]
        .filter(([, handle]) => !!handle)
        .map(([event, handle]) => [
          event,
          (e) => {
            const { center, srcEvent, tapCount } = e
            handle({
              center,
              srcEvent,
              tapCount,
            })
          },
        ]),
    )
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
    const listeners = Object.fromEntries(
      [
        ['rotatestart', onRotateStart],
        ['rotatemove', onRotate],
        ['rotateend', onRotateEnd],
        ['rotatecancel', onRotateCancel],
      ]
        .filter(([, handle]) => !!handle)
        .map(([event, handle]) => [
          event,
          (e) => {
            const { angle, center, srcEvent } = e
            handle({
              angle,
              center,
              srcEvent,
            })
          },
        ]),
    )
    const unbindListeners = bindListeners(listeners)

    return () => {
      unbindListeners()
    }
  }, [hammer, rotateEnabled, bindListeners, ...rotateCallbacks])

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
