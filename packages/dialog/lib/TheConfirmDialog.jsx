'use strict'

import { clone } from 'asobj'
import PropTypes from 'prop-types'
import React from 'react'
import { TheButton } from '@the-/button'
import { TheInput } from 'the-input'
import TheDialog from './TheDialog'

/**
 * Confirm Dialog
 */
class TheConfirmDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { confirmed: false }
  }

  render() {
    const { props, state } = this
    const { checkText, children, onSubmit, submitText } = props
    const { confirmed } = state

    const dialogProps = clone(props, {
      except: ['onSubmit', 'submitText', 'checkText'],
    })

    return (
      <TheDialog {...dialogProps}>
        <div>
          <div className='the-confirm-dialog-content'>{children}</div>
          <div className='the-confirm-dialog-action'>
            <TheInput.Checkbox
              className='the-confirm-dialog-checkbox'
              name='confirmed'
              onUpdate={(value) => this.setState(value)}
              options={{ ON: checkText }}
              value={confirmed}
            />
            <TheButton
              className='the-confirm-dialog-submit'
              disabled={confirmed !== 'ON'}
              onSubmit={onSubmit}
              primary
              wide
            >
              {submitText}
            </TheButton>
          </div>
        </div>
      </TheDialog>
    )
  }
}

TheConfirmDialog.propTypes = {
  /** Text of NO button */
  checkText: PropTypes.string,
  /** Close handler */
  onClose: PropTypes.func,
  /** Handler for submit */
  onSubmit: PropTypes.func,
  /** Shows the dialog */
  present: PropTypes.bool.isRequired,
  /** Show spin */
  spinning: PropTypes.bool,
  /** Text of submit button */
  submitText: PropTypes.string,
  /** Dialog Title */
  title: PropTypes.string,
}

TheConfirmDialog.defaultProps = {
  checkText: "I'm sure to do that",
  onClose: () => null,
  onSubmit: null,
  present: false,
  spinning: false,
  submitText: 'Submit',
  title: null,
}

TheConfirmDialog.displayName = 'TheConfirmDialog'

export default TheConfirmDialog
