'use strict'

import c from 'classnames'
import React from 'react'

export default function TheInputRangeLabel({ children, className, ref }) {
  return (
    <label className={c('the-input-range-label', className)} ref={ref}>
      <span>{children}</span>
    </label>
  )
}
