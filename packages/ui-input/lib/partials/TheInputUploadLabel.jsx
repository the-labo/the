'use strict'

import c from 'classnames'
import React from 'react'

export default React.memo(function TheInputUploadLabel({
  children,
  htmlFor,
  icon,
  text,
}) {
  return (
    <label className='the-input-upload-label' htmlFor={htmlFor}>
      <span className='the-input-upload-aligner' />
      <span className='the-input-upload-label-inner'>
        <i className={c('the-input-upload-icon', icon)} />
        <span className='the-input-upload-text'>{text}</span>
        {children}
      </span>
    </label>
  )
})
