'use strict'

import { cleanup } from 'asobj'
import c from 'classnames'
import flatpickr from 'flatpickr'
import PropTypes from 'prop-types'
import React from 'react'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'
import { onOffBoolean, renderErrorMessage } from './helpers'

class TheInputDate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.handleBlur = this.handleBlur.bind(this)
    this.picker = null
  }

  componentDidMount() {
    this.picker = flatpickr(
      this.elmRef.current,
      cleanup(
        {
          dateFormat: this.props.dateFormat,
          defaultDate: this.props.value,
          enableTime: this.props.timeEnabled,
          maxDate: this.props.maxDate,
          minDate: this.props.minDate,
          noCalendar: this.props.noCalendar,
          onChange: (selectedDates, dateStr) => {
            const { name, onUpdate, value } = this.props
            if (value !== dateStr) {
              onUpdate && onUpdate({ [name]: dateStr })
            }
          },
        },
        { delNull: true },
      ),
    )
    // this.updatePicker(this.props)
  }

  componentDidUpdate(prevProps) {
    const changed = changedProps(prevProps, this.props)
    this.updatePicker(changed)
  }

  componentWillUnmount() {
    this.picker.destroy()
    this.picker = null
  }

  handleBlur(e) {
    const { name, onBlur, onUpdate, value } = this.props
    onBlur && onBlur(e)
    if (value !== e.target.value) {
      onUpdate && onUpdate({ [name]: e.target.value })
    }
  }

  render() {
    const { props } = this
    const {
      autoComplete,
      autoFocus,
      children,
      className,
      error,
      id,
      name,
      placeholder,
      readOnly,
      required,
      spellCheck,
      tabIndex,
      type,
      value,
    } = props
    const autoCapitalize = onOffBoolean(props.autoCapitalize)
    const autoCorrect = onOffBoolean(props.autoCorrect)
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
        className={c('the-input-date', className, {
          'the-input-error': !!error,
        })}
        data-value={value}
      >
        {renderErrorMessage(error)}
        <input
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
          className='the-input-date-input'
          id={id}
          name={name}
          onBlur={this.handleBlur}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={this.elmRef}
          required={required}
          spellCheck={spellCheck}
          tabIndex={tabIndex}
          type={type}
          value={value}
        />
        {children}
      </div>
    )
  }

  updatePicker(config) {
    const skip = Object.keys(config).length === 0
    if (skip) {
      return
    }
    const { picker } = this
    if (!picker) {
      return
    }
    const { maxDate, minDate, value } = config
    picker.set(cleanup({ maxDate, minDate }))
    if (value) {
      picker.jumpToDate(value)
    }
    picker.redraw()
  }
}

TheInputDate.propTypes = {
  dateFormat: PropTypes.string,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  noCalendar: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  timeEnabled: PropTypes.bool,
}
TheInputDate.defaultProps = {
  dateFormat: null,
  maxDate: null,
  minDate: null,
  noCalendar: false,
  timeEnabled: false,
}
TheInputDate.displayName = 'TheInputDate'

export default TheInputDate
