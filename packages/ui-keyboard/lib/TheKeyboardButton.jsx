'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'

const TheKeyboardButton = (props) => {
  const { onClick, value } = props
  const handleClick = useCallback(() => {
    onClick && onClick(value)
  }, [onClick, value])
  return (
    <a
      className={c('the-keyboard-button', {
        'the-keyboard-button-empty': value === null,
      })}
      onClick={handleClick}
    >
      {value}
    </a>
  )
}

export default TheKeyboardButton
