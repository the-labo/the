'use strict'

import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'

export default function TheInputUploadCloseButton({ icon, onClick }) {
  return (
    <a className='the-input-upload-close' onClick={onClick}>
      <TheIcon className={c('the-input-upload-close-icon', icon)} />
    </a>
  )
}
