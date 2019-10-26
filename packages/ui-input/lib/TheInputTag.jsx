'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { uniqueFilter } from '@the-/util-array'
import TheInputTagItem from './partials/TheInputTagItem'
import TheInputText from './TheInputText'

const TheInputTag = React.memo((props) => {
  const {
    name,
    onBlur,
    onFocus,
    onKeyDown,
    onUpdate,
    options,
    splitter,
    value,
  } = props
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const splitValue = useCallback(() => {
    const split = String(value || '')
      .split(splitter)
      .reverse()
    return focused ? split : ['', ...split]
  }, [splitter, value, focus()])

  const updateBySplitValues = useCallback(
    (splitValues) => {
      const [edittingValue, ...tagValues] = splitValues
      const newValue = [edittingValue, ...tagValues.filter(uniqueFilter())]
        .reverse()
        .join(' ')
      onUpdate && onUpdate({ [name]: newValue })
    },
    [name, onUpdate],
  )

  const handleBack = useCallback(() => {
    const [edittingValue, ...tagValues] = splitValue()
    if (edittingValue.length === 0) {
      updateBySplitValues(['', ...tagValues.slice(1)])
    }
  }, [splitValue, updateBySplitValues])

  const handleBlur = useCallback(
    (e) => {
      const [edittingValue, ...tagValues] = splitValue()
      if (edittingValue.length > 0) {
        updateBySplitValues(['', edittingValue, ...tagValues])
      }

      onBlur && onBlur(e)
      setFocused(false)
    },
    [updateBySplitValues, onBlur],
  )

  const handleEnter = useCallback(() => {
    const [edittingValue, ...tagValues] = splitValue()
    if (edittingValue.length > 0) {
      updateBySplitValues(['', edittingValue, ...tagValues.slice()])
    }
  }, [splitValue, updateBySplitValues])

  const handleFocus = useCallback((e) => {
    onFocus && onFocus(e)
    setFocused(true)
  }, [])

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
    [onKeyDown, handleEnter, handleBack],
  )

  const handleUpdate = useCallback(
    (values) => {
      const edittingValue = values[name]
      const [, ...tagValues] = splitValue()
      updateBySplitValues([edittingValue, ...tagValues])
    },
    [name, splitValue, updateBySplitValues],
  )

  const optionsFor = useCallback(
    (tagValues) =>
      [].concat(options || []).filter((option) => !tagValues.includes(option)),
    [options],
  )

  const handleRemove = useCallback(
    (text) => {
      const tagValues = splitValue()
      updateBySplitValues(tagValues.filter((tagValue) => tagValue !== text))
    },
    [splitValue, updateBySplitValues],
  )

  const [edittingValue, ...tagValues] = splitValue()
  const inputProps = clone(props, {
    without: ['value', 'splitter', 'options'],
  })

  return (
    <TheInputText
      {...inputProps}
      className={c('the-input-tag', {
        'the-input-tag-focused': focused,
      })}
      inputRef={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onUpdate={handleUpdate}
      options={optionsFor(tagValues)}
      value={String(edittingValue).trim()}
    >
      {tagValues
        .filter(Boolean)
        .filter(uniqueFilter())
        .reverse()
        .map((text) => (
          <TheInputTagItem
            icon={TheInputTag.CLOSE_ICON}
            key={text}
            onRemove={handleRemove}
            text={text}
          />
        ))}
    </TheInputText>
  )
})

TheInputTag.CLOSE_ICON = 'fas fa-times'
TheInputTag.propTypes = Object.assign(
  clone(TheInputText.propTypes, { without: [] }),
  {
    splitter: PropTypes.any,
  },
)
TheInputTag.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, { without: [] }),
  {
    options: [],
    splitter: /[\s,]+/,
  },
)
TheInputTag.displayName = 'TheInputTag'

export default TheInputTag
