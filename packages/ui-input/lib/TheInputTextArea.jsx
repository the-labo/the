'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { renderErrorMessage } from './helpers'

/**
 * TextArea Input
 */
class TheInputTextArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.textareaRef = React.createRef()
    this.adjustRowTimer = -1
    this.gone = false
    this.state = {
      actualRows: props.minRows,
    }
  }

  adjustRows() {
    const { maxRows, minRows } = this.props
    const textarea = this.textareaRef.current
    if (!textarea) {
      return
    }
    const lineHeight = textarea.offsetHeight / this.state.actualRows
    if (isNaN(lineHeight)) {
      return
    }

    // 入力行数が少なくなったらそれに合わせてテキストエリアの行数も減らす
    // テキストエリアが offsetHeight < scrollHeight になるまで高さを小さくして、scrollHeight の最小値を求める
    const originalHeight = textarea.style.height
    let height = textarea.offsetHeight
    let retry = 100
    while (0 < retry--) {
      if (this.gone) {
        break
      }
      const smallEnough =
        textarea.offsetHeight < textarea.scrollHeight ||
        textarea.offsetHeight < lineHeight * minRows
      if (smallEnough) {
        break
      }
      height -= 3
      if (height < 0) {
        break
      }
      textarea.style.height = `${height}px`
    }
    const minScrollHeight = textarea.scrollHeight
    textarea.style.height = originalHeight

    let rows = Math.round(minScrollHeight / lineHeight)
    if (minRows) {
      rows = Math.max(minRows, rows)
    }
    if (maxRows) {
      rows = Math.min(maxRows, rows)
    }

    if (rows !== this.state.actualRows) {
      this.setState({ actualRows: rows })
    }
  }

  componentDidMount() {
    this.adjustRows()
  }

  componentDidUpdate() {
    const { autoExpand } = this.props
    if (autoExpand) {
      clearInterval(this.adjustRowTimer)
      this.adjustRowTimer = setTimeout(() => this.adjustRows(), 300)
    }
  }

  componentWillUnmount() {
    clearInterval(this.adjustRowTimer)
    this.gone = true
  }

  handleChange(e) {
    const { onChange, onUpdate, parser } = this.props
    const { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: parser(value) })

    const { autoExpand } = this.props
    if (autoExpand) {
      this.adjustRows()
    }
  }

  handleKeyDown(e) {
    const { onCombineEnter, onEnter, onKeyDown } = this.props
    switch (e.keyCode) {
      case 13: {
        // Enter
        const isCombine = e.metaKey || e.shiftKey || e.altKey || e.ctrlKey
        if (isCombine) {
          onCombineEnter && onCombineEnter()
        } else {
          onEnter && onEnter()
        }
        break
      }
      default:
        break
    }
    onKeyDown && onKeyDown(e)
  }

  render() {
    const { props } = this
    const {
      autoExpand,
      autoFocus,
      children,
      className,
      error,
      id,
      name,
      onBlur,
      onFocus,
      onKeyPress,
      onKeyUp,
      placeholder,
      readOnly,
      required,
      role,
      spellCheck,
      tabIndex,
      value,
    } = props
    const rows = autoExpand ? this.state.actualRows : this.props.rows
    return (
      <div
        {...htmlAttributesFor(props, {
          except: [
            'id',
            'className',
            'readOnly',
            'rows',
            'value',
            'name',
            'required',
            'placeholder',
            'role',
            'tabIndex',
          ],
        })}
        {...eventHandlersFor(props, {
          except: [
            'onChange',
            'onFocus',
            'onBlur',
            'onKeyUp',
            'onKeyDown',
            'onKeyPress',
          ],
        })}
        className={c('the-input-textarea', className, {
          'the-input-error': !!error,
        })}
        data-value={value}
      >
        {renderErrorMessage(error)}

        {readOnly ? (
          <pre className='the-input-textarea-readonly'>{value || ''}</pre>
        ) : (
          <textarea
            aria-multiline='true'
            autoFocus={autoFocus}
            className='the-input-textarea-input'
            id={id}
            name={name}
            onBlur={onBlur}
            onChange={this.handleChange}
            onFocus={onFocus}
            onKeyDown={this.handleKeyDown}
            onKeyPress={onKeyPress}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={this.textareaRef}
            required={required}
            role={role}
            rows={rows}
            spellCheck={spellCheck}
            tabIndex={tabIndex}
            value={value || ''}
          />
        )}
        {children}
      </div>
    )
  }
}

TheInputTextArea.propTypes = {
  /** Auto expanding text area height */
  autoExpand: PropTypes.bool,
  /** Max rows when autoExpand is enabled */
  maxRows: PropTypes.number,
  /** Min rows when autoExpand is enabled */
  minRows: PropTypes.number,
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Value parser */
  parser: PropTypes.func,
  /** TextArea rows */
  rows: PropTypes.number,
  /** Value of input */
  value: PropTypes.string,
}

TheInputTextArea.defaultProps = {
  autoExpand: false,
  error: null,
  maxRows: 10,
  minRows: 1,
  parser: String,
  readOnly: false,
  role: 'textbox',
  rows: 5,
  spellCheck: false,
  value: '',
}

TheInputTextArea.displayName = 'TheInputTextArea'

export default TheInputTextArea
