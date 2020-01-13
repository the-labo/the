'use strict'

import { cleanup } from 'asobj'
import c from 'classnames'
import flatpickr from 'flatpickr'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { renderErrorMessage } from './helpers'

const TheDateInput = React.memo((props) => {
  const elmRef = useRef(null)
  const [picker, setPicker] = useState(null)
  const {
    autoFocus,
    children,
    className,
    dateFormat,
    error,
    id,
    maxDate,
    minDate,
    name,
    noCalendar,
    onBlur,
    onUpdate,
    placeholder,
    readOnly,
    required,
    spellCheck,
    tabIndex,
    timeEnabled,
    type,
    value,
  } = props

  useEffect(() => {
    const newPicker = flatpickr(
      elmRef.current,
      cleanup(
        {
          dateFormat,
          defaultDate: value,
          enableTime: timeEnabled,
          maxDate,
          minDate,
          noCalendar,
          onChange: (selectedDates, dateStr) => {
            if (value !== dateStr) {
              onUpdate && onUpdate({ [name]: dateStr })
            }
          },
        },
        { delNull: true },
      ),
    )
    setPicker(newPicker)
    return () => {
      newPicker.destroy()
      setPicker(null)
    }
  }, [])

  useEffect(() => {
    if (!picker) {
      return
    }

    picker.set(cleanup({ maxDate, minDate }))
    picker.redraw()
  }, [picker, maxDate, minDate])
  useEffect(() => {
    if (!picker) {
      return
    }

    if (value) {
      picker.jumpToDate(value)
    } else {
      picker.clear()
    }

    picker.redraw()
  }, [value])

  const handleBlur = useCallback(
    (e) => {
      onBlur && onBlur(e)
      if (value !== e.target.value) {
        onUpdate && onUpdate({ [name]: e.target.value })
      }
    },
    [name, onBlur, onUpdate, value],
  )

  return (
    <div
      {...htmlAttributesFor(props, {
        except: [
          'id',
          'className',
          'type',
          'value',
          'tabIndex',
          'name',
          'required',
          'placeholder',
          'autoFocus',
          'autoComplete',
          'autoCapitalize',
          'autoCorrect',
          'spellCheck',
          'name',
        ],
      })}
      {...eventHandlersFor(props, {
        except: [
          'onChange',
          'onFocus',
          'onBlur',
          'onKeyUp',
          'onKeyDown',
          'onKeyPress',
        ],
      })}
      className={c('the-date-date', className, {
        'the-date-error': !!error,
      })}
      data-value={value}
    >
      {renderErrorMessage(error)}
      <input
        autoCapitalize='off'
        autoComplete='off'
        autoCorrect='off'
        autoFocus={autoFocus}
        className='the-date-date-input'
        id={id}
        name={name}
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={elmRef}
        required={required}
        spellCheck={spellCheck}
        tabIndex={tabIndex}
        type={type}
        value={value}
      />
      {children}
    </div>
  )
})

TheDateInput.propTypes = {
  dateFormat: PropTypes.string,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  noCalendar: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  timeEnabled: PropTypes.bool,
}
TheDateInput.defaultProps = {
  dateFormat: null,
  maxDate: null,
  minDate: null,
  noCalendar: false,
  timeEnabled: false,
  value: '',
}
TheDateInput.displayName = 'TheDateInput'

export default TheDateInput
