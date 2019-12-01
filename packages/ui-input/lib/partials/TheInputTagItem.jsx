'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'
import TheIcon from '@the-/ui-icon/shim/TheIcon'

export default React.memo(function TheInputTagItem({ icon, onRemove, text }) {
  const handleRemoveClick = useCallback(() => {
    onRemove(text)
  }, [text])
  return (
    <span className='the-input-tag-tag'>
      <span className='the-input-tag-back'></span>
      <span className='the-input-tag-text'>{text}</span>
      <span className={c('the-input-tag-remover')} onClick={handleRemoveClick}>
        <TheIcon className={icon} />
      </span>
    </span>
  )
})
