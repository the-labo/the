'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'

const TheToastItem = React.memo(({ hidden, icon, id, message, onClear }) => {
  const handleClick = useCallback(() => {
    onClear(id)
  }, [id, onClear])
  if (hidden) {
    return null
  }
  return (
    <div
      className='the-toast-item'
      data-message={message}
      id={id}
      onClick={handleClick}
    >
      <span className='the-toast-text'>
        {icon && <i className={c('the-toast-text', icon)} />}
        {message}
      </span>
    </div>
  )
})

export default TheToastItem
