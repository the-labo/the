'use strict'

import Hammer from 'hammerjs'

export function bindHammerListeners(hammer, listeners) {
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
}

export function setHammerPanEnabled(hammer, panEnabled) {
  const pan = hammer.get('pan')
  pan.set({ enable: panEnabled })
  if (panEnabled) {
    pan.set({ direction: Hammer.DIRECTION_ALL })
  }
}

export function setHammerPinchEnabled(hammer, pinchEnabled) {
  const pinch = hammer.get('pinch')
  pinch.set({ enable: pinchEnabled })
}

export function setHammerRotateEnabled(hammer, rotateEnabled) {
  const rotate = hammer.get('rotate')
  rotate.set({ enable: rotateEnabled })
}
