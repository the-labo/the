'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import TheInputText from './TheInputText'

const zeroIfNaN = (v) => (isNaN(Number(v)) ? 0 : v)
const sureNumber = (v) => zeroIfNaN(Number(v))
const TextOptions = []

class TheInputNumber extends React.PureComponent {
  constructor(props) {
    super(props)
    this.incrementValue = this.incrementValue.bind(this)
    this.decrementValue = this.decrementValue.bind(this)
  }

  get value() {
    let value = Number(this.props.value)
    if (isNaN(value)) {
      return this.props.value
    }
    const min = Number(this.props.min)
    const max = Number(this.props.max)
    if (!isNaN(min)) {
      value = Math.max(min, value)
    }
    if (!isNaN(max)) {
      value = Math.min(max, value)
    }
    return zeroIfNaN(value)
  }

  changeValue(amount) {
    const {
      props: { name, onUpdate, step, value },
    } = this
    onUpdate &&
      onUpdate({
        [name]: sureNumber(value) + sureNumber(amount) * sureNumber(step),
      })
  }

  decrementValue() {
    this.changeValue(-1)
  }

  incrementValue() {
    this.changeValue(1)
  }

  render() {
    const { props, value } = this
    const hasValue = Boolean(props.value) || props.value === 0
    return (
      <TheInputText
        {...props}
        className={c('the-input-number', props.className)}
        options={TextOptions}
        prefix={
          <a
            className={c('the-input-number-changer', {
              'the-input-number-changer-disabled': value <= props.min,
            })}
            href='javascript:void(0)'
            onClick={this.decrementValue}
          >
            <TheIcon className={TheInputNumber.DECREMENT_ICON} />
          </a>
        }
        suffix={
          <a
            className={c('the-input-number-changer', {
              'the-input-number-changer-disabled': value >= props.max,
            })}
            href='javascript:void(0)'
            onClick={this.incrementValue}
          >
            <TheIcon className={TheInputNumber.INCREMENT_ICON} />
          </a>
        }
        value={hasValue ? String(value) : null}
      />
    )
  }
}

TheInputNumber.INCREMENT_ICON = 'fas fa-caret-right'
TheInputNumber.DECREMENT_ICON = 'fas fa-caret-left'

TheInputNumber.propTypes = clone(TheInputText.propTypes, {
  without: ['type', 'options'],
})
TheInputNumber.defaultProps = Object.assign(
  {},
  clone(TheInputText.defaultProps, { without: ['type', 'options'] }),
  {
    autoCapitalize: false,
    autoCorrect: false,
    max: Infinity,
    min: -Infinity,
    pattern: /^[0-9\-.]*$/,
    patternWarning: 'Invalid Number',
    spellCheck: false,
    step: 1,
    type: 'text',
    value: 0,
  },
)
TheInputNumber.displayName = 'TheInputNumber'

export default TheInputNumber
