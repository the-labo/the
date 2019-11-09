'use strict'

import Hammer from 'hammerjs'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

  const recognizers = useMemo(() => {
    const singleTap = onTap && new Hammer.Tap({ event: 'singletap' })
    const doubleTap =
      onDoubleTap && new Hammer.Tap({ event: 'doubletap', taps: 2 })

    if (singleTap && doubleTap) {
      singleTap.requireFailure(doubleTap)
    }
    return [singleTap, doubleTap].filter(Boolean)
  }, [tapEnabled, ...tapCallbacks])

  const listeners = useMemo(
    () => ({
      ...(panEnabled
        ? Object.fromEntries(
            [
              ['pancancel', onPanCancel],
              ['panend', onPanEnd],
              ['panmove', onPan],
              ['panstart', onPanStart],
            ].map(([event, cb]) => [
              event,
              (e) => {
                const { center, deltaX, deltaY, srcEvent } = e
                cb &&
                  cb({
                    center,
                    srcEvent,
                    vx: deltaX,
                    vy: deltaY,
                  })
              },
            ]),
          )
        : {}),
      ...(pinchEnabled
        ? Object.fromEntries(
            [
              ['pinchin', onPinch],
              ['pinchout', onPinch],
              ['pinchend', onPinchEnd],
              ['pinchstart', onPinchStart],
            ].map(([event, cb]) => [
              event,
              (e) => {
                const { center, scale, srcEvent } = e
                cb &&
                  cb({
                    center,
                    scale,
                    srcEvent,
                  })
              },
            ]),
          )
        : {}),
      ...(tapEnabled
        ? Object.fromEntries(
            [['singletap', onTap], ['doubletap', onDoubleTap]].map(
              ([event, cb]) => [
                event,
                (e) => {
                  const { center, srcEvent, tapCount } = e
                  cb &&
                    cb({
                      center,
                      srcEvent,
                      tapCount,
                    })
                },
              ],
            ),
          )
        : {}),
    }),
    [
      pinchEnabled,
      panEnabled,
      tapEnabled,
      ...pinchCallbacks,
      ...panCallbacks,
      ...tapCallbacks,
    ],
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
    for (const recognizer of recognizers) {
      hammer.add(recognizer)
    }
    return () => {
      for (const [event, listener] of Object.entries(listeners)) {
        hammer.off(event, listener)
      }
      for (const recognizer of recognizers) {
        hammer.remove(recognizer)
      }
    }
  }, [hammer, panEnabled, pinchEnabled, listeners, recognizers])

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
