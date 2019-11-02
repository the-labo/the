'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { renderErrorMessage } from './helpers'

/**
 * TextArea Input
 */
const TheInputTextArea = React.memo((props) => {
  const {
    autoExpand,
    autoFocus,
    children,
    className,
    error,
    id,
    maxRows,
    minRows,
    name,
    onBlur,
    onChange,
    onCombineEnter,
    onEnter,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onUpdate,
    parser,
    placeholder,
    readOnly,
    required,
    role,
    spellCheck,
    tabIndex,
    value,
  } = props
  const textareaRef = useRef(null)
  const [actualRows, setActualRows] = useState(props.minRows)

  const adjustRows = useCallback(() => {
    const { current: textarea } = textareaRef
    if (!textarea) {
      return
    }

    const newActualRows = applyRows(textarea, actualRows, { maxRows, minRows })
    if (newActualRows !== actualRows) {
      setActualRows(newActualRows)
    }
  }, [autoExpand, actualRows, setActualRows, minRows, maxRows])

  useEffect(() => {
    if (!autoExpand) {
      return
    }

    const timer = setTimeout(() => adjustRows(), 300)
    adjustRows()
    return () => clearTimeout(timer)
  }, [autoExpand, value])

  const handleChange = useCallback(
    (e) => {
      const {
        target: { name, value },
      } = e
      onChange && onChange(e)
      onUpdate && onUpdate({ [name]: parser(value) })
      if (autoExpand) {
        adjustRows()
      }
    },
    [autoExpand, adjustRows, onChange, onUpdate],
  )

  const handleKeyDown = useCallback(
    (e) => {
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
    },
    [onKeyDown, onCombineEnter, onEnter],
  )

  const rows = autoExpand ? actualRows : props.rows
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
          onChange={handleChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={textareaRef}
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
})

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

const applyRows = (textarea, currentRows, { maxRows, minRows }) => {
  const lineHeight = textarea.offsetHeight / currentRows
  if (isNaN(lineHeight)) {
    return
  }

  // 入力行数が少なくなったらそれに合わせてテキストエリアの行数も減らす
  // テキストエリアが offsetHeight < scrollHeight になるまで高さを小さくして、scrollHeight の最小値を求める
  const {
    style: { height: originalHeight },
  } = textarea
  let { offsetHeight: height } = textarea
  let retry = 100
  while (retry-- > 0) {
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
  const { scrollHeight: minScrollHeight } = textarea
  textarea.style.height = originalHeight

  let newRows = Math.round(minScrollHeight / lineHeight)
  if (minRows) {
    newRows = Math.max(minRows, newRows)
  }

  if (maxRows) {
    newRows = Math.min(maxRows, newRows)
  }

  return newRows
}

export default TheInputTextArea
