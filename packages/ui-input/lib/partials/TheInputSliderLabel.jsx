'use strict'

import c from 'classnames'
import React from 'react'

export default function TheInputSliderLabel({ children, className, ref }) {
  return (
    <label className={c('the-input-slider-label', className)} ref={ref}>
      <span>{children}</span>
    </label>
  )
}
