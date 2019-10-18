'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheFormBinder from './TheFormBinder'

/**
 * Form of the-components
 */
const TheForm = React.memo((props) => {
  const { children, className, errorLead, errors, inline, spinning } = props

  const hasError = Object.keys(errors || {}).length > 0
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-busy={spinning}
      className={classnames('the-form', className, {
        'the-form-inline': inline,
      })}
    >
      {hasError && !!errorLead && (
        <p className='the-form-error-lead'>{errorLead}</p>
      )}
      {children}
      {spinning && <TheForm.Spinner />}
    </div>
  )
})

TheForm.Field = function Field(props) {
  const { children, className, inline = false } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-form-field', className, {
        'the-form-field-inline': inline,
      })}
    >
      {children}
    </div>
  )
}

TheForm.FieldSet = function FieldSet(props) {
  const { children, className } = props
  return (
    <fieldset
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-form-field-set', className)}
      role='group'
    >
      {children}
    </fieldset>
  )
}

TheForm.Label = function Label(props) {
  const { children, className, required } = props
  return (
    <label
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-form-label', className, {
        'the-form-label-required': required,
      })}
    >
      {children}
    </label>
  )
}

TheForm.Legend = function Legend(props) {
  const { children, className } = props
  return (
    <legend
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-form-legend', className)}
    >
      {children}
    </legend>
  )
}

TheForm.Spinner = function Spinner() {
  return (
    <div className='the-form-spinner'>
      <TheIcon.Spin />
    </div>
  )
}

TheForm.Value = function Value(props) {
  const { children, className } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-form-value', className)}
    >
      {children}
    </div>
  )
}

TheForm.propTypes = {
  /** Lead text when error */
  errorLead: PropTypes.node,
  /** As inline styles */
  inline: PropTypes.bool,
  /** Shows spinner */
  spinning: PropTypes.bool,
}

TheForm.defaultProps = {
  errorLead: null,
  inline: false,
  role: 'form',
  spinning: false,
}

TheForm.Binder = TheFormBinder
TheForm.displayName = 'TheForm'

export default TheForm
