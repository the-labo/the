'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo } from 'react'
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
const TheToast = React.memo((props) => {
  const {
    children,
    className,
    clearAfter,
    level,
    maxSize = 5,
    onUpdate,
  } = props
  const tmp = useMemo(
    () => ({
      clearTimers: [],
      counts: {},
    }),
    [],
  )
  const messages = useMemo(
    () =>
      props.messages.map((message) => {
        if (typeof message === 'string') {
          const number = (tmp.counts[message] || 0) + 1
          tmp.counts[message] = number
          const id = [message, number].join('--')
          return { id, message }
        }
        return message
      }, []),
    [props.messages, tmp],
  )

  const clearMessage = useCallback(
    (id) => {
      clearTimeout(tmp.clearTimers[id])
      delete tmp.clearTimers[id]
      const newMessages = messages.filter((m) => m.id !== id)
      onUpdate &&
        onUpdate({
          [level]: newMessages,
        })
    },
    [onUpdate, messages, level.tmp],
  )

  useEffect(() => {
    for (const { id } of messages) {
      if (clearAfter > 0) {
        if (!tmp.clearTimers[id]) {
          tmp.clearTimers[id] = setTimeout(() => {
            clearMessage(id)
          }, clearAfter)
        }
      }
    }
  }, [clearAfter, clearMessage, messages])

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
        {messages.map((message, i) => (
          <TheToastItem
            hidden={maxSize <= i}
            icon={icon}
            id={message.id}
            key={message.id}
            message={message.message}
            onClear={clearMessage}
          />
        ))}
        <ChildContainer>{children}</ChildContainer>
      </div>
    </div>
  )
})

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
  messages: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
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
