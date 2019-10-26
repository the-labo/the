'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheIcon } from '@the-/ui-icon'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import { normalizeOptions, renderErrorMessage } from './helpers'
import TheInputSelectOptionList from './partials/TheInputSelectOptionList'

const noop = () => null

/**
 * Select Input
 */
const TheInputSelect = React.memo((props) => {
  const {
    children,
    className,
    disabledValues = [],
    error,
    fullScreen,
    id,
    name,
    nullable,
    nullText,
    onBlur,
    onChange,
    onEnter,
    onFocus,
    onKeyDown,
    onKeyUp,
    onUpdate,
    parser,
    placeholder,
    readOnly,
    sorter,
    spinning = false,
    tabIndex,
    type,
    value,
  } = props

  const elmRef = useRef(null)
  const optionsElmRef = useRef(null)
  const inputElmRef = useRef(null)

  const getOptionValues = useCallback(() => {
    const normalizedOptions = normalizeOptions(props.options)
    return Object.keys(normalizedOptions || {}).sort(sorter)
  }, [props.options, sorter])

  const getIndexForValue = useCallback(
    (value) => getOptionValues().indexOf(value),
    [getOptionValues],
  )

  const [suggesting, setSuggesting] = useState(false)
  const [suggestingIndex, setSuggestingIndex] = useState(
    getIndexForValue(value),
  )
  const [suggestOffTimer, setSuggestOffTimer] = useState(-1)

  const offSuggestion = useCallback(
    (delay = 10) => {
      clearTimeout(suggestOffTimer)
      const newSuggestOffTimer = setTimeout(() => {
        setSuggesting(false)
      }, delay)
      setSuggestOffTimer(newSuggestOffTimer)
    },
    [suggestOffTimer, setSuggestOffTimer],
  )

  const handleDocumentClick = useCallback(
    (e) => {
      const { current: elm } = elmRef
      if (!elm) {
        return
      }

      const inside = elm.contains(e.target)
      if (!inside) {
        offSuggestion()
      }
    },
    [elmRef, offSuggestion],
  )

  useEffect(() => {
    const window = get('window')
    window.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    const { current: optionsElm } = optionsElmRef
    if (!optionsElm) {
      return
    }
    if (!suggesting) {
      optionsElm.style.top = 0
      return
    }
    const minY = get('document.body.clientTop')
    const maxY = get('document.body.clientHeight')
    const rect = optionsElm.getBoundingClientRect()
    const topOut = rect.top < minY
    const bottomOut = rect.bottom > maxY
    if (!topOut && bottomOut) {
      const amount = Math.min(rect.bottom - maxY, rect.top - minY)
      optionsElm.style.top = amount * -1
    }
  }, [suggesting])

  const handleChange = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e
      onChange && onChange(e)
      onUpdate && onUpdate({ [name]: parser(value) })
    },
    [onChange, onUpdate, parser],
  )

  const enterSuggested = useCallback(
    (value) => {
      if (!suggesting) {
        return
      }
      setSuggesting(false)
      setSuggestingIndex(getIndexForValue(value))
      handleChange({
        target: { name, value },
      })
    },
    [suggesting, setSuggesting, handleChange, setSuggestingIndex],
  )

  const handleBlur = useCallback(
    (e) => {
      onBlur && onBlur(e)
    },
    [onBlur],
  )

  const handleDisplayClick = useCallback(() => {
    clearTimeout(suggestOffTimer)

    const newSuggesting = !suggesting

    setSuggesting(newSuggesting)
    setSuggestingIndex(getIndexForValue(value))
  }, [value, suggesting, setSuggestingIndex, getIndexForValue])

  useEffect(() => {
    const { current: inputElm } = inputElmRef
    if (suggesting) {
      inputElm && inputElm.focus()
    } else {
      inputElm && inputElm.blur()
    }
  }, [suggesting])

  const moveCandidateIndex = useCallback(
    (amount) => {
      const values = getOptionValues()
      const newSuggestingIndex = suggestingIndex + amount
      const over =
        newSuggestingIndex === -1 || newSuggestingIndex === values.length
      if (over) {
        return false
      }
      setSuggestingIndex(newSuggestingIndex)
      return true
    },
    [suggestingIndex, getOptionValues],
  )

  const handleFocus = useCallback(
    (e) => {
      clearTimeout(suggestOffTimer)
      setSuggesting(true)
      e.preventDefault()
      e.stopPropagation()
      onFocus && onFocus(e)
    },
    [onFocus, suggestOffTimer, setSuggesting],
  )

  const handleEnter = useCallback(() => {
    const values = getOptionValues()
    enterSuggested(values[suggestingIndex])
    onEnter && onEnter()
  }, [onEnter, getOptionValues, enterSuggested, suggestingIndex])

  const handleUp = useCallback(
    (e) => {
      const moved = moveCandidateIndex(-1)
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [moveCandidateIndex],
  )

  const handleDown = useCallback(
    (e) => {
      const moved = moveCandidateIndex(+1)
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [moveCandidateIndex],
  )

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.keyCode) {
        // Enter
        case 13: {
          handleEnter()
          break
        }
        // UP
        case 38: {
          handleUp(e)
          break
        }
        // DOWN
        case 40: {
          handleDown(e)
          break
        }
        case 9: // Tab
          offSuggestion()
          break
        default:
          setSuggesting(true)
          break
      }

      onKeyDown && onKeyDown(e)
    },
    [
      onKeyDown,
      offSuggestion,
      setSuggesting,
      handleEnter,
      handleUp,
      handleDown,
    ],
  )

  const handleKeyUp = useCallback(
    (e) => {
      onKeyUp && onKeyUp(e)
    },
    [onKeyUp],
  )

  const handleNull = useCallback(() => {
    onUpdate && onUpdate({ [name]: null })
    setSuggesting(false)
  }, [name, onUpdate, setSuggesting])

  const handleSelect = useCallback(
    ({ value }) => {
      enterSuggested(value)
    },
    [enterSuggested],
  )

  const options = useMemo(() => normalizeOptions(props.options), [
    props.options,
  ])

  const selectedValue = options[value]
  const hasSelect = typeof selectedValue !== 'undefined'
  return (
    <div
      {...htmlAttributesFor(props, {
        except: [
          'id',
          'className',
          'type',
          'value',
          'name',
          'placeholder',
          'tabIndex',
        ],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-input-select', className, {
        'the-input-error': !!error,
      })}
      data-value={value}
      ref={elmRef}
    >
      {renderErrorMessage(error)}
      {spinning ? (
        <TheSpin className='the-input-select-spin' cover enabled />
      ) : null}
      {!readOnly && (
        <a className='the-input-select-display' onClick={handleDisplayClick}>
          <TheCondition if={hasSelect}>
            <span className='the-input-select-display-value'>
              {selectedValue}
            </span>
          </TheCondition>
          <TheCondition if={!hasSelect}>
            <span className='the-input-select-display-alt'>{placeholder}</span>
          </TheCondition>
          <TheIcon className={TheInputSelect.OPEN_ICON} />
        </a>
      )}

      <input
        className='the-input-select-input'
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={noop}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        readOnly
        ref={inputElmRef}
        tabIndex={tabIndex}
        type={type}
        value={value || ''}
      />

      {readOnly ? (
        <span className='the-input-select-readonly'>{options[value]}</span>
      ) : (
        <select
          className='the-input-select-select'
          onChange={handleChange}
          tabIndex={-1}
          value={value || ''}
        >
          {nullable && <option name={name} value={null} />}
          {Object.keys(options).map((optionValue) => (
            <option
              disabled={disabledValues.includes(optionValue)}
              key={optionValue}
              name={name}
              value={optionValue}
            >
              {optionValue}
            </option>
          ))}
        </select>
      )}

      {children}
      {!readOnly && suggesting && (
        <TheInputSelectOptionList
          disabledValues={disabledValues}
          full={fullScreen}
          nullable={nullable}
          nullText={nullText}
          onClose={offSuggestion}
          onNull={handleNull}
          onSelect={handleSelect}
          options={options}
          optionsRef={optionsElmRef}
          parser={parser}
          sorter={sorter}
          suggestingIndex={suggestingIndex}
        />
      )}
    </div>
  )
})

TheInputSelect.OPEN_ICON = 'fa fa-caret-down'

TheInputSelect.propTypes = {
  /** Unselecatable values */
  disabledValues: PropTypes.arrayOf(PropTypes.string),
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Allow null select */
  nullable: PropTypes.bool,
  /** Text for null */
  nullText: PropTypes.node,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Options sorter */
  sorter: PropTypes.func,
  spinning: PropTypes.bool,
  /** Value of input */
  value: PropTypes.string,
}

TheInputSelect.defaultProps = {
  disabledValues: [],
  error: null,
  nullable: false,
  nullText: '( no select )',
  onEnter: null,
  options: {},
  parser: String,
  sorter: (v1, v2) => String(v1).localeCompare(v2),
  spinning: false,
  value: '',
}

TheInputSelect.displayName = 'TheInputSelect'

TheInputSelect.WithOptionsArray = function WithOptionsArray(props) {
  const { optionsArray, ...otherProps } = props
  const compareOptions = useCallback(
    (a, b) => {
      const valueArray = optionsArray.map(([v]) => v)
      return valueArray.indexOf(a) - valueArray.indexOf(b)
    },
    [optionsArray],
  )

  const options = useMemo(
    () =>
      Object.assign(
        {},
        ...optionsArray.map(([v, node]) => ({
          [v]: node,
        })),
      ),
    [optionsArray],
  )
  return (
    <TheInputSelect {...otherProps} options={options} sorter={compareOptions} />
  )
}

export default TheInputSelect
