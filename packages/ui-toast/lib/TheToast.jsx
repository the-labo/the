'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
import { uniqueFilter } from '@the-/util-array'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheToastItem from './TheToastItem'

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
  const {
    children,
    className,
    clearAfter,
    level,
    maxSize = 5,
    onUpdate,
  } = props

  const normalizedMessage = useMemo(
    () =>
      props.messages.filter(uniqueFilter()).filter(Boolean).slice(0, maxSize),
    [props.messages, maxSize],
  )

  const clearMessage = useCallback(
    (message) => {
      onUpdate &&
        onUpdate({
          [level]: normalizedMessage.filter(
            (filtering) => filtering !== message,
          ),
        })
    },
    [onUpdate, normalizedMessage, level],
  )

  const reserveClearings = useCallback(() => {
    if (clearAfter > 0) {
      const messagesToClear = normalizedMessage.filter(
        (message) => !_clearTimers[message],
      )
      for (const message of messagesToClear) {
        _clearTimers[message] = setTimeout(() => {
          clearMessage(message)
          delete _clearTimers[message]
        }, clearAfter)
      }
    }
  }, [normalizedMessage, clearAfter, clearMessage, _clearTimers])

  useEffect(() => {
    reserveClearings()

    return () => {
      for (const message of Object.keys(_clearTimers)) {
        if (!normalizedMessage.includes(message)) {
          clearTimeout(_clearTimers[message])
          delete _clearTimers[message]
        }
      }
    }
  }, [_clearTimers, normalizedMessage, reserveClearings])

  const icon = TheToast.iconForLevel(level)
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-toast', className, `the-toast-${level}`, {
        'the-toast-empty': normalizedMessage.length === 0,
      })}
    >
      <div className='the-toast-inner'>
        {normalizedMessage.map((message) => (
          <TheToastItem
            icon={icon}
            key={message}
            message={message}
            onClear={clearMessage}
          />
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
