'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { TheSpin } from '@the-/ui-spin'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  toggleBodyClass,
} from '@the-/util-ui'

/**
 * Dialog for the-components
 */
class TheDialog extends React.Component {
  static Background({ onClose }) {
    return (
      <div className='the-dialog-back' onClick={() => onClose()}>
        <div className='the-dialog-back-inner' />
      </div>
    )
  }

  static Body({ children, className, style }) {
    return (
      <div
        className={c('the-dialog-body', className)}
        style={Object.assign({}, style)}
      >
        {children}
      </div>
    )
  }

  static Footer({ children, className }) {
    return (
      <div className={c('the-dialog-footer', className)}>
        <div className='the-dialog-footer-inner'>{children}</div>
      </div>
    )
  }

  static Header({ children, className, style }) {
    return (
      <div
        className={c('the-dialog-header', className)}
        role='heading'
        style={Object.assign({}, style)}
      >
        {children}
      </div>
    )
  }

  constructor() {
    super(...arguments)
    this._id = newId({ prefix: 'the-dialog-' })
  }

  get id() {
    return this.props.id || this._id
  }

  componentDidMount() {
    const { props } = this
    this.toggleDocumentScroll(props.present)
  }

  componentDidUpdate(prevProps) {
    const { props } = this
    const presentChanged = props.present !== prevProps.present
    if (presentChanged) {
      this.toggleDocumentScroll(props.present)
    }
  }

  componentWillUnmount() {
    this.toggleDocumentScroll(false)
  }

  render() {
    const {
      props,
      props: {
        children,
        className,
        footer,
        full = false,
        hideCloseButton,
        icon,
        lead,
        onClose,
        present,
        spinning,
        title,
        zIndex,
      },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, {
          except: ['className', 'title', 'lead'],
        })}
        {...eventHandlersFor(props, { except: [] })}
        aria-hidden={!present}
        className={c('the-dialog', className, {
          'the-dialog-full': full,
          'the-dialog-present': present,
        })}
        id={this.id}
      >
        <div className='the-dialog-inner'>
          <style className='the-dialog-fix-style'>
            {`.the-dialog-fix-for-${this.id} {overflow: hidden !important;}`}
            {zIndex ? `#${this.id} {z-index: ${zIndex};}` : null}
          </style>
          <TheDialog.Background onClose={onClose} />
          <div className='the-dialog-content'>
            <TheSpin cover enabled={spinning} />
            <TheDialog.Header>
              <h3 className='the-dialog-title'>
                {icon && <TheIcon className={c(icon)} />}
                {title}
              </h3>
              {!hideCloseButton && (
                <a
                  className='the-dialog-close-button'
                  onClick={onClose}
                  role='button'
                >
                  <TheIcon className={TheDialog.CLOSE_ICON} />
                </a>
              )}
            </TheDialog.Header>
            <TheDialog.Body
              className={c({
                'the-dialog-body-for-footer': !!footer,
              })}
            >
              {lead && <h5 className='the-dialog-lead'>{lead}</h5>}
              {children}
            </TheDialog.Body>
            {footer && <TheDialog.Footer>{footer}</TheDialog.Footer>}
          </div>
        </div>
      </div>
    )
  }

  toggleDocumentScroll(enabled) {
    toggleBodyClass(`the-dialog-fix-for-${this.id}`, enabled)
  }
}

TheDialog.CLOSE_ICON = 'fas fa-times'

TheDialog.propTypes = {
  /** Hide Close Button */
  hideCloseButton: PropTypes.bool,
  /** Dialog icon */
  icon: PropTypes.string,
  /** Lead text of dialog body */
  lead: PropTypes.node,
  /** Close handler */
  onClose: PropTypes.func,
  /** Shows the dialog */
  present: PropTypes.bool.isRequired,
  /** Show spin */
  spinning: PropTypes.bool,
  /** Dialog Title */
  title: PropTypes.node,
  /** Z index of dialog */
  zIndex: PropTypes.number,
}

TheDialog.defaultProps = {
  hideCloseButton: false,
  icon: null,
  onClose: () => null,
  present: false,
  role: 'dialog',
  spinning: false,
  title: null,
  zIndex: null,
}

TheDialog.displayName = 'TheDialog'

export default TheDialog
