'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from '@the-/ui-button'
import { TheForm } from '@the-/ui-form'
import { TheInput } from '@the-/ui-input'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Chat UI of the-components
 */
class TheChatForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleKeyDown(e) {
    const isSubmit = e.keyCode === 13 && (e.shiftKey || e.metaKey)
    if (isSubmit) {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    const {
      props: {
        onSubmit,
        values,
        values: { text },
      },
    } = this

    if (!text) {
      return
    }
    onSubmit && onSubmit(values)
  }

  handleUpdate(values) {
    const {
      props: { onUpdate },
    } = this
    onUpdate && onUpdate(values)
  }

  render() {
    const {
      props,
      props: {
        autoExpand,
        children,
        className,
        disabled,
        maxRows,
        minLength,
        minRows,
        spinning,
        submitText,
        values,
      },
    } = this

    const canSubmit = (values.text || '').trim().length >= minLength
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-chat-form', className)}
      >
        {children}
        <TheForm className='the-chat-form-form' inline>
          <TheInput.TextArea
            autoExpand={autoExpand}
            disabled={disabled}
            maxRows={maxRows}
            minRows={minRows}
            name='text'
            onKeyDown={this.handleKeyDown}
            onUpdate={this.handleUpdate}
            value={values.text}
          />
          <TheButton
            disabled={!canSubmit || disabled}
            onSubmit={this.handleSubmit}
            primary
            spinning={spinning}
          >
            {submitText}
          </TheButton>
        </TheForm>
      </div>
    )
  }
}

TheChatForm.propTypes = {
  /** Disabled attribute */
  disabled: PropTypes.bool,
  /** Max rows */
  maxRows: PropTypes.number,
  /** Minimum text length */
  minLength: PropTypes.number,
  /** Min rows */
  minRows: PropTypes.number,
  /** Handler for value submit */
  onSubmit: PropTypes.func.isRequired,
  /** Handler for value update */
  onUpdate: PropTypes.func.isRequired,
  spinning: PropTypes.bool,
  /** Text for submit */
  submitText: PropTypes.string,
  /** Form values */
  values: PropTypes.object.isRequired,
}

TheChatForm.defaultProps = {
  autoExpand: true,
  disabled: false,
  maxRows: 5,
  minLength: 1,
  minRows: 2,
  onSubmit: () => null,
  onUpdate: () => null,
  spinning: false,
  submitText: 'Send',
  values: {},
}

TheChatForm.displayName = 'TheChatForm'

export default TheChatForm
