'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'

const normalizeMessages = (arr) =>
  []
    .concat(arr)
    .filter(Boolean)
    .filter((e, i, arr) => i === arr.indexOf(e))

const ChildContainer = (props) => {
  props = Object.assign({}, props)
  delete props.in
  delete props.onExited
  return <div {...props}>{props.children}</div>
}

/**
 * Toast of the-components
 */
class TheToast extends React.PureComponent {
  static Error(props) {
    return <TheToast {...props} level='error' />
  }

  static Info(props) {
    return <TheToast {...props} level='info' />
  }

  static Normal(props) {
    return <TheToast {...props} level='normal' />
  }

  static Warn(props) {
    return <TheToast {...props} level='warn' />
  }

  static iconForLevel(level) {
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

  constructor(props) {
    super(props)
    this._clearTimers = {}
  }

  clearMessage(message) {
    const { level, messages, onUpdate } = this.props

    onUpdate &&
      onUpdate({
        [level]: messages.filter((filtering) => filtering !== message),
      })
  }

  componentDidMount() {
    this.reserveClearings()
  }

  componentDidUpdate() {
    this.reserveClearings()
  }

  componentWillUnmount() {
    for (const name of Object.keys(this._clearTimers)) {
      clearTimeout(this._clearTimers[name])
    }
  }

  render() {
    const { props } = this
    const { children, className, level } = props
    let { messages } = props
    messages = normalizeMessages(messages)
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
          {messages.map((message) => (
            <div
              className='the-toast-item'
              data-message={message}
              key={message}
              onClick={() => this.clearMessage(message)}
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

  reserveClearings() {
    const { clearAfter, messages } = this.props
    if (clearAfter > 0) {
      const messagesToClear = normalizeMessages(messages).filter(
        (message) => !this._clearTimers[message],
      )
      for (let message of messagesToClear) {
        this._clearTimers[message] = setTimeout(() => {
          this.clearMessage(message)
          delete this._clearTimers[message]
        }, clearAfter)
      }
    }
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
