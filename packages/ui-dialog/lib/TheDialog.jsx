'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { StylePresets } from '@the-/const-ui'
import TheIcon from '@the-/ui-icon/shim/TheIcon'
import TheSpin from '@the-/ui-spin/shim/TheSpin'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  toggleBodyClass,
} from '@the-/util-ui'

const BODY_FIX_STYLE = Object.entries(StylePresets.FixedBody)
  .map(([k, v]) => `${k}: ${v} !important`)
  .join(';')

/**
 * Dialog for the-components
 */
const TheDialog = (props) => {
  const {
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
  } = props
  const id = useMemo(() => props.id || newId({ prefix: 'the-dialog-' }), [
    props.id,
  ])
  const toggleDocumentScroll = useCallback(
    (enabled) => toggleBodyClass(`the-dialog-fix-for-${id}`, enabled),
    [id],
  )

  useEffect(() => {
    toggleDocumentScroll(present)
    return () => toggleDocumentScroll(false)
  }, [present, id])

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
      id={id}
    >
      <div className='the-dialog-inner'>
        <style className='the-dialog-fix-style'>
          {`.the-dialog-fix-for-${id} { ${BODY_FIX_STYLE} }`}
          {zIndex ? `#${id} {z-index: ${zIndex};}` : null}
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
                aria-label='Close'
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

TheDialog.Background = function TheDialogBackground({ onClose }) {
  return (
    <div className='the-dialog-back' onClick={() => onClose()}>
      <div className='the-dialog-back-inner' />
    </div>
  )
}

TheDialog.Body = function TheDialogBody({ children, className, style }) {
  return (
    <div
      className={c('the-dialog-body', className)}
      style={Object.assign({}, style)}
    >
      {children}
    </div>
  )
}

TheDialog.Footer = function TheDialogFooter({ children, className }) {
  return (
    <div className={c('the-dialog-footer', className)}>
      <div className='the-dialog-footer-inner'>{children}</div>
    </div>
  )
}

TheDialog.Header = function TheDialogHeader({
  ariaLevel = 2,
  children,
  className,
  role = 'heading',
  style,
}) {
  return (
    <div
      aria-level={ariaLevel}
      className={c('the-dialog-header', className)}
      role={role}
      style={Object.assign({}, style)}
    >
      {children}
    </div>
  )
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
