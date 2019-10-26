'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { newId } from '@the-/util-ui'
import TheInputText from './TheInputText'

const TheInputPinCode = React.memo((props) => {
  const inputRef = useRef(null)
  const {
    digit,
    name,
    onBlur,
    onEnter,
    onFocus,
    onKeyDown,
    only,
    onUpdate,
    value,
  } = props
  const [focused, setFocused] = useState(false)
  const [index, setIndex] = useState(0)
  const id = useMemo(() => props.id || newId(), [props.id])
  const handleBack = useCallback(() => {}, [])

  const handleBlur = useCallback(
    (e) => {
      onBlur && onBlur(e)
      setFocused(false)
    },
    [onBlur],
  )

  const handleEnter = useCallback(
    (e) => {
      onEnter && onEnter(e)
    },
    [onEnter],
  )

  const handleFocus = useCallback(
    (e) => {
      onFocus && onFocus(e)
      setFocused(true)
      setIndex(value.length)
    },
    [onFocus, value],
  )

  const handleItemClick = useCallback(
    (index) => {
      setIndex(index)
      if (value.length > index) {
        onUpdate && onUpdate({ [name]: value.substr(0, index) })
      }
    },
    [name, onUpdate, value],
  )

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 13:
          handleEnter()
          break
        case 8:
          handleBack()
          break
        default:
          break
      }

      onKeyDown && onKeyDown(e)
    },
    [handleEnter, handleBack, onKeyDown],
  )

  const handleUpdate = useCallback(
    (values) => {
      const newValue = String(values[name])
        .split('')
        .filter((v) => (only ? only.test(v) : !!v))
        .join('')
        .trim()
        .slice(0, digit)
      if (value === newValue) {
        return
      }

      onUpdate &&
        onUpdate({
          [name]: newValue,
        })
      setIndex(newValue.length)
    },
    [digit, name, only, onUpdate, value],
  )

  const inputProps = clone(props, { without: ['digit'] })

  return (
    <TheInputText
      {...inputProps}
      className={c('the-input-pin-code', {
        'the-input-pin-code-focused': focused,
      })}
      id={`${id}-text`}
      inputRef={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onUpdate={handleUpdate}
      value={props.value}
    >
      <div className='the-input-pin-code-display'>
        {new Array(digit).fill(null).map((_, i) => (
          <TheInputPinCodeItem
            htmlFor={`${id}-text`}
            index={i}
            key={i}
            onClick={handleItemClick}
            selected={focused && index === i}
            value={(props.value || '')[i]}
          />
        ))}
      </div>
    </TheInputText>
  )
})

const TheInputPinCodeItem = React.memo((props) => {
  const { htmlFor, index, onClick, selected, value } = props
  const handleClick = useCallback(() => {
    onClick && onClick(index)
  }, [index, onClick])

  return (
    <label
      className={c('the-input-pin-code-item', {
        'the-input-pin-code-item-selected': selected,
      })}
      htmlFor={htmlFor}
      onClick={handleClick}
    >
      {value || ''}
    </label>
  )
})

TheInputPinCode.propTypes = Object.assign(
  clone(TheInputText.propTypes, { without: [] }),
  {
    digit: PropTypes.number.isRequired,
    only: PropTypes.any,
  },
)
TheInputPinCode.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, { without: [] }),
  {
    digit: 4,
    only: /\d/,
  },
)
TheInputPinCode.displayName = 'TheInputPinCode'

export default TheInputPinCode
