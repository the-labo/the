'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { unlessProduction } from '@the-/check-env'
import TheIcon from '@the-/ui-icon/shim/TheIcon'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'
import { normalizeOptions, renderErrorMessage } from './helpers'

/**
 * Radio input of the-components
 */
const TheInputRadio = React.memo((props) => {
  const {
    asButton,
    asToggle,
    className,
    disabledValues,
    error,
    name,
    onChange,
    onUpdate,
    parser,
    readOnly,
    sorter,
    tabIndex,
    value,
  } = props
  const id = useMemo(() => props.id || newId(), [props.id])

  const idFor = useCallback((optionValue) => [id, optionValue].join('-'), [id])

  const options = normalizeOptions(props.options)

  unlessProduction(() => {
    if (asToggle && asButton) {
      throw new Error(
        '[TheButton] You cannot use `asToggle` and `asButton` at same time',
      )
    }
  })

  return (
    <div
      {...htmlAttributesFor(props, {
        except: ['id', 'className', 'name', 'value', 'tabIndex'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-input-radio', className, {
        'the-input-error': !!error,
        'the-input-radio-as-button': asButton,
        'the-input-radio-as-toggle': asToggle,
      })}
      data-value={value}
      id={id}
    >
      {renderErrorMessage(error)}
      <div className={c('the-input-radio-inner')}>
        {readOnly ? (
          <span className='the-input-radio-readonly-label'>
            {options[value]}
          </span>
        ) : (
          Object.keys(options)
            .sort(sorter)
            .map((optionValue) => (
              <TheInputRadio.Option
                checked={String(optionValue).trim() === String(value).trim()}
                disabled={disabledValues.includes(optionValue)}
                id={idFor(optionValue)}
                key={optionValue}
                label={options[optionValue]}
                name={name}
                onChange={onChange}
                onUpdate={onUpdate}
                parser={parser}
                tabIndex={tabIndex}
                value={optionValue}
              />
            ))
        )}
      </div>
    </div>
  )
})

TheInputRadio.Option = function TheInputRadioOption({
  checked,
  disabled,
  id,
  label,
  name,
  onChange,
  onUpdate,
  parser,
  tabIndex = 0,
  value,
}) {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e)
      onUpdate && onUpdate({ [name]: parser(value) })
    },
    [onChange, onUpdate, name, value],
  )

  const handleKeyDown = useCallback(
    (e) => {
      const isSpace = e.keyCode === 32
      if (isSpace) {
        onUpdate && onUpdate({ [name]: parser(value) })
        e.stopPropagation()
        e.preventDefault()
      }
    },
    [onUpdate, checked],
  )
  const icon = checked ? TheInputRadio.CHECKED_ICON : TheInputRadio.NORMAL_ICON
  return (
    <div
      aria-checked={checked}
      aria-label={typeof label === 'string' ? label : null}
      className={c('the-input-radio-item', {
        'the-input-radio-item-checked': checked,
        'the-input-radio-item-disabled': disabled,
      })}
      data-value={value}
      key={value}
      role='radio'
    >
      <input
        checked={checked}
        className='the-input-radio-radio'
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleChange}
        tabIndex={-1}
        type='radio'
        value={value}
      />
      <label
        className='the-input-radio-label'
        htmlFor={id}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
      >
        <TheIcon className={c('the-input-radio-icon', icon)} />
        {label}
      </label>
    </div>
  )
}

TheInputRadio.NORMAL_ICON = 'far fa-circle'
TheInputRadio.CHECKED_ICON = 'far fa-dot-circle'

TheInputRadio.propTypes = {
  /** Using button-like style */
  asButton: PropTypes.bool,
  /** Using toggle-like style */
  asToggle: PropTypes.bool,
  /** Disabled values */
  disabledValues: PropTypes.array,
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Name of input */
  name: PropTypes.string.isRequired,
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
  /** Value of input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

TheInputRadio.defaultProps = {
  asButton: false,
  asToggle: false,
  disabledValues: [],
  error: null,
  options: {},
  parser: String,
  role: 'radiogroup',
  sorter: (v1, v2) => String(v1).localeCompare(v2),
  value: '',
}

TheInputRadio.displayName = 'TheInputRadio'

export default TheInputRadio
