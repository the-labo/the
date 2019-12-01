'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React, { useCallback, useMemo } from 'react'
import TheIcon from '@the-/ui-icon/shim/TheIcon'
import TheInputText from './TheInputText'

const zeroIfNaN = (v) => (isNaN(Number(v)) ? 0 : v)
const sureNumber = (v) => zeroIfNaN(Number(v))
const TextOptions = []

const TheInputNumber = React.memo((props) => {
  const { name, onUpdate, step } = props
  const value = useMemo(() => {
    let value = Number(props.value)
    if (isNaN(value)) {
      return props.value
    }

    const min = Number(props.min)
    const max = Number(props.max)
    if (!isNaN(min)) {
      value = Math.max(min, value)
    }

    if (!isNaN(max)) {
      value = Math.min(max, value)
    }

    return zeroIfNaN(value)
  }, [props.min, props.max, props.value])

  const changeValue = useCallback(
    (amount) => {
      onUpdate &&
        onUpdate({
          [name]: sureNumber(value) + sureNumber(amount) * sureNumber(step),
        })
    },
    [name, value, step],
  )

  const decrementValue = useCallback(() => changeValue(-1), [changeValue])
  const incrementValue = useCallback(() => changeValue(1), [changeValue])

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
          onClick={decrementValue}
        >
          <TheIcon className={TheInputNumber.DECREMENT_ICON} />
        </a>
      }
      suffix={
        <a
          className={c('the-input-number-changer', {
            'the-input-number-changer-disabled': value >= props.max,
          })}
          onClick={incrementValue}
        >
          <TheIcon className={TheInputNumber.INCREMENT_ICON} />
        </a>
      }
      value={hasValue ? String(value) : null}
    />
  )
})

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
