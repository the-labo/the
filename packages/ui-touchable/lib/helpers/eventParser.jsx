'use strict'

import { get } from '@the-/window'

export function parsePanEvent(e) {
  const { center, deltaX, deltaY, srcEvent } = e
  return {
    center,
    srcEvent,
    vx: deltaX,
    vy: deltaY,
  }
}

export function parsePinchEvent(e) {
  const { center, scale, srcEvent } = e
  const rect = e.target.getBoundingClientRect()
  const bodyRect = get('document').body.getBoundingClientRect()
  return {
    center,
    scale,
    scaleOrigin: {
      x: e.pageX - (rect.left - bodyRect.left),
      y: e.pageY - (rect.top - bodyRect.top),
    },
    srcEvent,
  }
}

export function parseTapEvent(e) {
  const { center, srcEvent, tapCount } = e
  return {
    center,
    srcEvent,
    tapCount,
  }
}

export function parseRotateEvent(e) {
  const { angle, center, srcEvent } = e
  return {
    angle,
    center,
    srcEvent,
  }
}

export function parseWheelEvent(e, { scale }) {
  return {
    center: {
      x: e.clientX,
      y: e.clientY,
    },
    scale,
    scaleOrigin: {
      x: e.offsetX,
      y: e.offsetY,
    },
    srcEvent: e,
  }
}

export function parseGestureEvent(e, { scale }) {
  const rect = e.target.getBoundingClientRect()
  const bodyRect = get('document').body.getBoundingClientRect()
  return {
    center: {
      x: e.clientX,
      y: e.clientY,
    },
    scale,
    scaleOrigin: {
      x: e.pageX - (rect.left - bodyRect.left),
      y: e.pageY - (rect.top - bodyRect.top),
    },
    srcEvent: e,
  }
}
