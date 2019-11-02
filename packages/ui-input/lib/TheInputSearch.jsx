'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React, { useCallback, useRef, useState } from 'react'
import { TheIcon } from '@the-/ui-icon'
import TheInputText from './TheInputText'

const TheInputSearch = React.memo((props) => {
  const [open, setOpen] = useState(!!props.open)
  const inputRef = useRef(null)
  const { onFocus, value } = props

  const toggleOpen = useCallback(
    (newOpen) => {
      if (typeof newOpen === 'undefined') {
        newOpen = !open
      }

      if (newOpen === open) {
        return
      }

      setOpen(newOpen)
      const { current: input } = inputRef
      const focusTimer = setTimeout(() => {
        if (open && input) {
          input.focus()
        }
      })
      return () => {
        clearTimeout(focusTimer)
      }
    },
    [open, inputRef],
  )

  const handleFocus = useCallback(
    (e) => {
      onFocus && onFocus(e)
      toggleOpen(true)
    },
    [onFocus],
  )

  return (
    <TheInputText
      {...props}
      className={c('the-input-search', {
        'the-input-search-open': open || !!value,
      })}
      inputRef={inputRef}
      onFocus={handleFocus}
      type='search'
    >
      {!value && (
        <a
          className={c('the-input-search-toggle')}
          onClick={toggleOpen}
          tabIndex={-1}
        >
          <TheIcon className={TheInputSearch.SEARCH_ICON} />
        </a>
      )}
    </TheInputText>
  )
})

TheInputSearch.SEARCH_ICON = 'fa fa-search'
TheInputSearch.propTypes = clone(TheInputText.propTypes, { without: ['type'] })
TheInputSearch.defaultProps = clone(TheInputText.defaultProps, {
  without: ['type'],
})
TheInputSearch.displayName = 'TheInputSearch'

export default TheInputSearch
