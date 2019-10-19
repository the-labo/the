'use strict'

const pointFromTouchEvent = (e) => {
  const [touch] = e.changedTouches || []
  if (!touch) {
    return null
  }

  const { clientX: x, clientY: y } = touch
  return { x, y }
}

export default pointFromTouchEvent
