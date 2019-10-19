'use strict'

const sourceElementScrollFor = (e) => {
  let target = e.target || e.srcElement
  let left = 0
  let top = 0
  while (target) {
    left += target.scrollLeft
    top += target.scrollTop
    target = target.parentElement
  }
  return { left, top }
}

export default sourceElementScrollFor
