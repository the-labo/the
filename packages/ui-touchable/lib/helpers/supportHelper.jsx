'use strict'

import { get } from '@the-/window'

export function isGestureSupported() {
  return !!get('window.GestureEvent')
}

export function isTouchSupported() {
  return !!get('window.ontouchstart')
}
