'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor, newId } from '@the-/util-ui'
import {
  normalizeArrayValue,
  normalizeOptions,
  renderErrorMessage,
} from './helpers'

/**
 * Checkbox input of the-components
 */
class TheInputCheckbox extends React.PureComponent {
  static Option({
    checked,
    disabled,
    id,
    label,
    name,
    onChange,
    tabIndex,
    value,
  }) {
    const icon = checked
      ? TheInputCheckbox.CHECKED_ICON
      : TheInputCheckbox.NORMAL_ICON
    return (
      <div
        aria-checked={checked}
        aria-label={label}
        className={c('the-input-checkbox-item', {
          'the-input-checkbox-item-checked': checked,
          'the-input-checkbox-item-disabled': disabled,
        })}
        data-value={value}
        key={value}
        role='checkbox'
      >
        <input
          checked={checked}
          className='the-input-checkbox-checkbox'
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          tabIndex={tabIndex}
          type='checkbox'
          value={value}
        />
        <label className='the-input-checkbox-label' htmlFor={id}>
          <TheIcon className={c('the-input-checkbox-icon', icon)} />
          {label}
        </label>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.id = newId()
  }

  handleChange(e) {
    const {
      props: { onChange, onUpdate, parser, splitter },
    } = this
    let {
      props: { value },
    } = this

    let {
      target: { value: changedValue },
    } = e
    const {
      target: { checked, name },
    } = e
    changedValue = String(changedValue).trim()
    value = normalizeArrayValue(value, splitter).map((value) =>
      String(value).trim(),
    )
    const has = value.includes(changedValue)
    if (has && !checked) {
      value = value.filter((value) => value !== changedValue)
    }

    if (!has && checked) {
      value.push(changedValue)
    }

    onChange && onChange(e)
    onUpdate &&
      onUpdate({
        [name]: parser(value),
      })
  }

  idFor(optionValue) {
    const {
      props: { id = this.id },
    } = this
    return [id, ...[].concat(optionValue)].join('-')
  }

  render() {
    const {
      props: {
        asButton,
        className,
        disabledValues,
        error,
        id = this.id,
        name,
        readOnly,
        splitter,
        tabIndex,
      },
      props,
    } = this
    let {
      props: { options, value },
    } = this

    options = normalizeOptions(options)
    value = normalizeArrayValue(value, splitter).map((value) =>
      String(value).trim(),
    )

    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['id', 'className', 'tabIndex', 'value'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-input-checkbox', className, {
          'the-input-checkbox-as-button': asButton,
          'the-input-error': !!error,
        })}
        data-value={value}
        id={id}
      >
        {renderErrorMessage(error)}
        <div className={c('the-input-checkbox-inner')}>
          {readOnly ? (
            <span className='the-input-checkbox-readonly'>
              {options[value]}
            </span>
          ) : (
            Object.keys(options).map((optionValue) => (
              <TheInputCheckbox.Option
                checked={optionValue
                  .split(splitter)
                  .some((optionValue) =>
                    value.includes(String(optionValue).trim()),
                  )}
                disabled={disabledValues.includes(optionValue)}
                id={this.idFor(optionValue)}
                key={optionValue}
                label={options[optionValue]}
                name={name}
                onChange={(e) => this.handleChange(e)}
                tabIndex={tabIndex}
                value={optionValue}
              />
            ))
          )}
        </div>
      </div>
    )
  }
}

TheInputCheckbox.NORMAL_ICON = 'far fa-square'
TheInputCheckbox.CHECKED_ICON = 'fas fa-check-square'

TheInputCheckbox.propTypes = {
  /** Name of input */
  /** Error message */
  /** Disabled values */
  disabledValues: PropTypes.array,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.bool),
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Value Splitter text */
  splitter: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

TheInputCheckbox.defaultProps = {
  disabledValues: [],
  error: null,
  options: {},
  parser: String,
  splitter: ',',
  value: '',
}

TheInputCheckbox.displayName = 'TheInputCheckbox'

export default TheInputCheckbox
