'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

const ChildContainer = (props) => {
  props = Object.assign({}, props)
  delete props.in
  delete props.onExited
  return <div {...props}>{props.children}</div>
}

/**
 * Toast of the-components
 */
const TheToast = (props) => {
  const _clearTimers = useMemo(() => ({}), [])
  const { children, className, clearAfter, level, messages, onUpdate } = props
  const clearMessage = useCallback(
    (message) => {
      onUpdate &&
        onUpdate({
          [level]: messages.filter((filtering) => filtering !== message),
        })
    },
    [onUpdate],
  )

  const reserveClearings = useCallback(() => {
    if (clearAfter > 0) {
      const messagesToClear = messages.filter(
        (message) => !_clearTimers[message],
      )
      for (const message of messagesToClear) {
        _clearTimers[message] = setTimeout(() => {
          clearMessage(message)
          delete _clearTimers[message]
        }, clearAfter)
      }
    }
  }, [messages, clearAfter])

  useEffect(() => {
    reserveClearings()
    return () => {
      for (const name of Object.keys(_clearTimers)) {
        clearTimeout(_clearTimers[name])
      }
    }
  }, [_clearTimers, messages])
  const icon = TheToast.iconForLevel(level)
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-toast', className, `the-toast-${level}`, {
        'the-toast-empty': messages.length === 0,
      })}
    >
      <div className='the-toast-inner'>
        {messages.filter(Boolean).map((message) => (
          <div
            className='the-toast-item'
            data-message={message}
            key={message}
            onClick={() => clearMessage(message)}
          >
            <span className='the-toast-text'>
              {icon && <i className={c('the-toast-text', icon)} />}
              {message}
            </span>
          </div>
        ))}
        <ChildContainer>{children}</ChildContainer>
      </div>
    </div>
  )
}

TheToast.Error = function Error(props) {
  return <TheToast {...props} level='error' />
}

TheToast.Info = function Info(props) {
  return <TheToast {...props} level='info' />
}

TheToast.Normal = function Normal(props) {
  return <TheToast {...props} level='normal' />
}

TheToast.Warn = function Warn(props) {
  return <TheToast {...props} level='warn' />
}

TheToast.iconForLevel = (level) => {
  switch (level) {
    case 'error':
      return TheToast.ERROR_ICON
    case 'info':
      return TheToast.INFO_ICON
    case 'warn':
      return TheToast.WARN_ICON
    default:
      return null
  }
}

TheToast.INFO_ICON = 'fas fa-check-circle'
TheToast.WARN_ICON = 'fas fa-exclamation-triangle'
TheToast.ERROR_ICON = 'fas fa-exclamation-circle'

TheToast.propTypes = {
  /** Clear message after seconds */
  clearAfter: PropTypes.number,
  /** Level of toast */
  level: PropTypes.oneOf(['info', 'normal', 'warn', 'error']),
  /** Messages to show */
  messages: PropTypes.arrayOf(PropTypes.node),
  /** Handle update */
  onUpdate: PropTypes.func,
}

TheToast.defaultProps = {
  clearAfter: -1,
  level: 'normal',
  role: 'alert',
}

TheToast.displayName = 'TheToast'

export default TheToast
