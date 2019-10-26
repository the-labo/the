'use strict'

import c from 'classnames'
import React, { useCallback } from 'react'

export default React.memo(function TheInputSelectOptionListItem(props) {
  const { children, disabled, onSelect, selected, value } = props
  const handleClick = useCallback(() => {
    onSelect && onSelect({ value })
  }, [onSelect, value])

  return (
    <li
      className={c('the-input-select-option', {
        'the-input-select-option-disabled': disabled,
        'the-input-select-option-selected': selected,
      })}
      data-value={value}
      onClick={handleClick}
      role='option'
    >
      {children}
    </li>
  )
})
