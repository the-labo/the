'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { renderErrorMessage } from './helpers'
import TheInputCheckbox from './TheInputCheckbox'
import TheInputNumber from './TheInputNumber'
import TheInputPassword from './TheInputPassword'
import TheInputPinCode from './TheInputPinCode'
import TheInputRadio from './TheInputRadio'
import TheInputSearch from './TheInputSearch'
import TheInputSelect from './TheInputSelect'
import TheInputTag from './TheInputTag'
import TheInputText from './TheInputText'
import TheInputTextArea from './TheInputTextArea'
import TheInputToggle from './TheInputToggle'
import TheInputUpload from './TheInputUpload'

/**
 * Input of the-components
 */
const TheInput = React.memo((props) => {
  const {
    autoComplete,
    autoFocus,
    children,
    className,
    error,
    id,
    inputRef,
    name,
    onChange,
    onUpdate,
    parser,
    placeholder,
    required,
    type,
    value,
  } = props
  const handleChange = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e
      onChange && onChange(e)
      onUpdate && onUpdate({ [name]: parser(value) })
    },
    [name, value, onChange, onUpdate, parser],
  )

  return (
    <div
      {...htmlAttributesFor(props, {
        except: [
          'id',
          'className',
          'type',
          'value',
          'required',
          'name',
          'placeholder',
          'autoFocus',
          'autoComplete',
        ],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-input', className, {
        'the-input-error': !!error,
      })}
    >
      {renderErrorMessage(error)}
      {children}
      <input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputRef}
        required={required}
        type={type}
        value={value || ''}
      />
    </div>
  )
})

TheInput.Text = TheInputText
TheInput.Search = TheInputSearch
TheInput.Password = TheInputPassword
TheInput.TextArea = TheInputTextArea
TheInput.PinCode = TheInputPinCode
TheInput.Radio = TheInputRadio
TheInput.Checkbox = TheInputCheckbox
TheInput.Select = TheInputSelect
TheInput.Toggle = TheInputToggle
TheInput.Upload = TheInputUpload
TheInput.Tag = TheInputTag
TheInput.Number = TheInputNumber

TheInput.propTypes = {
  /** Input type */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Name of input */
  name: PropTypes.string,
  /** Handle for update */
  onUpdate: PropTypes.func,
  type: PropTypes.string,
  /** Value of input */
  value: PropTypes.string,
}

TheInput.defaultProps = {
  error: null,
  name: '_the',
  options: {},
  parser: String,
  type: 'text',
  value: '',
}

TheInput.displayName = 'TheInput'

export default TheInput
