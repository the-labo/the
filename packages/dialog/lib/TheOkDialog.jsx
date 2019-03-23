'use strict'

import { clone } from 'asobj'
import PropTypes from 'prop-types'
import React from 'react'
import TheDialog from './TheDialog'

/**
 * Ok Dialog
 */
class TheOkDialog extends React.Component {
  static Button({ onClick, text }) {
    return (
      <a className='the-ok-dialog-button' onClick={onClick} role='button'>
        <span className='the-ok-dialog-button-text'>{text}</span>
      </a>
    )
  }

  render() {
    const { props } = this
    const { okText, onClose } = props

    const dialogProps = clone(props, { except: ['okText'] })

    const footer = (
      <div className='the-ok-dialog-control'>
        <TheOkDialog.Button onClick={onClose} text={okText} />
      </div>
    )

    return <TheDialog {...dialogProps} footer={footer} />
  }
}

TheOkDialog.propTypes = {
  /** Shows the dialog */
  /** Text for OK button */
  okText: PropTypes.string,
  /** Close handler */
  onClose: PropTypes.func,
  present: PropTypes.bool.isRequired,
  /** Show spin */
  spinning: PropTypes.bool,
  /** Dialog Title */
  title: PropTypes.string,
}

TheOkDialog.defaultProps = {
  okText: 'OK',
  onClose: () => null,
  present: false,
  role: 'alertdialog',
  spinning: false,
  title: null,
}

TheOkDialog.displayName = 'TheOkDialog'

export default TheOkDialog
