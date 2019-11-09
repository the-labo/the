'use strict'

import Hammer from 'hammerjs'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { unlessProduction } from '@the-/check-env'

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
    onPinchEnd,
    onPinchStart,
    onTap,
  } = props
  const pinchCallbacks = [onPinch, onPinchStart, onPinchEnd]
  const panCallbacks = [onPan, onPanCancel, onPanEnd, onPanStart]
  const tapCallbacks = [onTap, onDoubleTap]

  const pinchEnabled = pinchCallbacks.some((handler) => !!handler)
  const panEnabled = panCallbacks.some((handler) => !!handler)
  const tapEnabled = tapCallbacks.some((handler) => !!handler)

  unlessProduction(() => {
    const nothingEnabled = !pinchEnabled && !panEnabled && !tapEnabled
    nothingEnabled &&
      console.warn('[TheTouchable] Nothing to do. May be you forgot pass props')
  })
  const ref = useRef(null)
  const [hammer, setHammer] = useState(null)

  const bindListeners = useCallback(
    (listeners) => {
      if (!hammer) {
        return
      }
      for (const [event, listener] of Object.entries(listeners)) {
        hammer.on(event, listener)
      }
      return () => {
        for (const [event, listener] of Object.entries(listeners)) {
          hammer.off(event, listener)
        }
      }
    },
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
    const pan = hammer.get('pan')
    pan.set({ enable: panEnabled })
    if (!panEnabled) {
      return
    }
    pan.set({ direction: Hammer.DIRECTION_ALL })
    const listeners = Object.fromEntries(
      [
        ['pancancel', onPanCancel],
        ['panend', onPanEnd],
        ['panmove', onPan],
        ['panstart', onPanStart],
      ]
        .filter(([, cb]) => !!cb)
        .map(([event, cb]) => [
          event,
          (e) => {
            const { center, deltaX, deltaY, srcEvent } = e
            cb({
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
    const pinch = hammer.get('pinch')
    pinch.set({ enable: pinchEnabled })
    if (!pinchEnabled) {
      return
    }
    const listeners = Object.fromEntries(
      [
        ['pinchin', onPinch],
        ['pinchout', onPinch],
        ['pinchend', onPinchEnd],
        ['pinchstart', onPinchStart],
      ]
        .filter(([, cb]) => !!cb)
        .map(([event, cb]) => [
          event,
          (e) => {
            const { center, scale, srcEvent } = e
            cb({
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

  useEffect(() => {
    if (!hammer) {
      return
    }
    if (!tapEnabled) {
      return
    }
    const listeners = Object.fromEntries(
      [['tap', onTap], ['doubletap', onDoubleTap]]
        .filter(([, cb]) => !!cb)
        .map(([event, cb]) => [
          event,
          (e) => {
            const { center, srcEvent, tapCount } = e
            cb({
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
  onPinchEnd: PropTypes.func,
  onPinchStart: PropTypes.func,
  onTap: PropTypes.func,
}

TheTouchable.defaultProps = {
  onDoubleTap: null,
  onPan: null,
  onPanCancel: null,
  onPanEnd: null,
  onPanStart: null,
  onPinch: null,
  onPinchEnd: null,
  onPinchStart: null,
  onTap: null,
}

TheTouchable.displayName = 'TheTouchable'

export default TheTouchable
