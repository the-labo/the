'use strict'

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
  return {
    center,
    scale,
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
