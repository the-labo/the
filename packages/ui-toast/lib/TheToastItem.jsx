'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'

const TheToastItem = React.memo(({ icon, message, onClear }) => {
  const handleClick = useCallback(() => {
    onClear(message)
  }, [message, onClear])
  return (
    <div
      className='the-toast-item'
      data-message={message}
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
