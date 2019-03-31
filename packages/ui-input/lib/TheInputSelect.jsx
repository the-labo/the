'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheIcon } from '@the-/ui-icon'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import { normalizeOptions, renderErrorMessage } from './helpers'

const noop = () => null

/**
 * Select Input
 */
class TheInputSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
    this.optionsElmRef = React.createRef()
    this.inputElmRef = React.createRef()
    this.state = {
      suggesting: false,
      suggestingIndex: this.getIndexForValue(this.props.value),
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.handleDisplayClick = this.handleDisplayClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleNull = this.handleNull.bind(this)
    this.offSuggestion = this.offSuggestion.bind(this)
    this._suggestOffTimer = -1
  }

  componentDidMount() {
    const window = get('window')
    window.addEventListener('click', this.handleDocumentClick)
  }

  componentDidUpdate() {
    const optionsElm = this.optionsElmRef.current
    if (optionsElm) {
      const minY = get('document.body.clientTop')
      const maxY = get('document.body.clientHeight')
      const rect = optionsElm.getBoundingClientRect()
      const topOut = rect.top < minY
      const bottomOut = rect.bottom > maxY
      if (!topOut && bottomOut) {
        const amount = Math.min(rect.bottom - maxY, rect.top - minY)
        optionsElm.style.top -= amount
      }
    }
  }

  componentWillUnmount() {
    const window = get('window')
    window.removeEventListener('click', this.handleDocumentClick)
    clearTimeout(this._suggestOffTimer)
  }

  enterSuggested(value) {
    const { state } = this
    if (!state.suggesting) {
      return
    }
    this.setState({
      suggesting: false,
      suggestingIndex: this.getIndexForValue(value),
    })
    const { name } = this.props
    this.handleChange({
      target: { name, value },
    })
  }

  getIndexForValue(value) {
    return this.getOptionValues().indexOf(value)
  }

  getOptionValues() {
    const { props } = this
    const options = normalizeOptions(props.options)
    return Object.keys(options || {}).sort(props.sorter)
  }

  handleBlur(e) {
    const { onBlur } = this.props
    onBlur && onBlur(e)
  }

  handleChange(e) {
    const { onChange, onUpdate, parser } = this.props
    const { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: parser(value) })
  }

  handleDisplayClick(e) {
    clearTimeout(this._suggestOffTimer)
    const { state } = this
    const inputElm = this.inputElmRef.current
    const suggesting = !state.suggesting
    if (suggesting) {
      inputElm && inputElm.focus()
    } else {
      inputElm && inputElm.blur()
    }
    this.setState({
      suggesting,
      suggestingIndex: this.getIndexForValue(this.props.value),
    })
  }

  handleDocumentClick(e) {
    const elm = this.elmRef.current

    if (!elm) {
      return
    }
    const inside = elm.contains(e.target)
    if (!inside) {
      this.offSuggestion()
    }
  }

  handleFocus(e) {
    clearTimeout(this._suggestOffTimer)
    this.setState({ suggesting: true })
    const { onFocus } = this.props
    e.preventDefault()
    e.stopPropagation()
    onFocus && onFocus(e)
  }

  handleKeyDown(e) {
    const { onEnter, onKeyDown } = this.props
    switch (e.keyCode) {
      // Enter
      case 13: {
        const values = this.getOptionValues()
        const { suggestingIndex } = this.state
        this.enterSuggested(values[suggestingIndex])
        if (onEnter) {
          onEnter()
        }
        break
      }
      // UP
      case 38: {
        const moved = this.moveCandidateIndex(-1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      // DOWN
      case 40: {
        const moved = this.moveCandidateIndex(+1)
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
        }
        break
      }
      case 9: // Tab
        this.offSuggestion()
        break
      default:
        this.setState({ suggesting: true })
        break
    }
    onKeyDown && onKeyDown(e)
  }

  handleKeyUp(e) {
    const { onKeyUp } = this.props
    onKeyUp && onKeyUp(e)
  }

  handleNull() {
    const { name, onUpdate } = this.props
    onUpdate && onUpdate({ [name]: null })
    this.setState({ suggesting: false })
  }

  handleSelect({ value }) {
    this.enterSuggested(value)
  }

  moveCandidateIndex(amount) {
    const { state } = this
    const values = this.getOptionValues()
    const index = state.suggestingIndex + amount
    const over = index === -1 || index === values.length
    if (over) {
      return false
    }
    this.setState({
      suggestingIndex: index,
    })
    return true
  }

  offSuggestion(delay = 10) {
    clearTimeout(this._suggestOffTimer)
    this._suggestOffTimer = setTimeout(() => {
      this.setState({ suggesting: false })
    }, delay)
  }

  render() {
    const { props } = this
    const {
      children,
      className,
      disabledValues = [],
      error,
      fullScreen,
      id,
      name,
      nullable,
      nullText,
      parser,
      placeholder,
      readOnly,
      sorter,
      spinning = false,
      tabIndex,
      type,
      value,
    } = props
    const options = normalizeOptions(props.options)
    const { suggesting, suggestingIndex } = this.state
    const selectedValue = options[value]
    const hasSelect = typeof selectedValue !== 'undefined'
    return (
      <div
        {...htmlAttributesFor(props, {
          except: [
            'id',
            'className',
            'type',
            'value',
            'name',
            'placeholder',
            'tabIndex',
          ],
        })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-input-select', className, {
          'the-input-error': !!error,
        })}
        data-value={value}
        ref={this.elmRef}
      >
        {renderErrorMessage(error)}
        {spinning ? (
          <TheSpin className='the-input-select-spin' cover enabled />
        ) : null}
        {!readOnly && (
          <a
            className='the-input-select-display'
            onClick={this.handleDisplayClick}
          >
            <TheCondition if={hasSelect}>
              <span className='the-input-select-display-value'>
                {selectedValue}
              </span>
            </TheCondition>
            <TheCondition if={!hasSelect}>
              <span className='the-input-select-display-alt'>
                {placeholder}
              </span>
            </TheCondition>
            <TheIcon className={TheInputSelect.OPEN_ICON} />
          </a>
        )}

        <input
          className='the-input-select-input'
          {...{ id, name, placeholder, tabIndex, type }}
          onBlur={this.handleBlur}
          onChange={noop}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          readOnly
          ref={this.inputElmRef}
          value={value || ''}
        />

        {readOnly ? (
          <span className='the-input-select-readonly'>{options[value]}</span>
        ) : (
          <select
            className='the-input-select-select'
            onChange={this.handleChange}
            tabIndex={-1}
            value={value || ''}
          >
            {nullable && <option name={name} value={null} />}
            {Object.keys(options).map((optionValue) => (
              <option
                disabled={disabledValues.includes(optionValue)}
                key={optionValue}
                name={name}
                value={optionValue}
              >
                {optionValue}
              </option>
            ))}
          </select>
        )}

        {children}
        {!readOnly && suggesting && (
          <TheInputSelectOptionList
            {...{ options, parser, sorter, suggestingIndex }}
            disabledValues={disabledValues}
            full={fullScreen}
            nullable={nullable}
            nullText={nullText}
            onClose={this.offSuggestion}
            onNull={this.handleNull}
            onSelect={this.handleSelect}
            optionsRef={this.optionsElmRef}
          />
        )}
      </div>
    )
  }
}

TheInputSelect.OPEN_ICON = 'fa fa-caret-down'

TheInputSelect.propTypes = {
  /** Unselecatable values */
  disabledValues: PropTypes.arrayOf(PropTypes.string),
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Allow null select */
  nullable: PropTypes.bool,
  /** Text for null */
  nullText: PropTypes.node,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Options sorter */
  sorter: PropTypes.func,
  spinning: PropTypes.bool,
  /** Value of input */
  value: PropTypes.string,
}

TheInputSelect.defaultProps = {
  disabledValues: [],
  error: null,
  nullable: false,
  nullText: '( no select )',
  onEnter: null,
  options: {},
  parser: String,
  sorter: (v1, v2) => String(v1).localeCompare(v2),
  spinning: false,
  value: '',
}

TheInputSelect.displayName = 'TheInputSelect'

TheInputSelect.WithOptionsArray = function WithOptionsArray({
  optionsArray,
  ...props
}) {
  const valueArray = optionsArray.map(([v]) => v)
  const sorter = (a, b) => valueArray.indexOf(a) - valueArray.indexOf(b)
  return (
    <TheInputSelect
      {...props}
      options={Object.assign(
        {},
        ...optionsArray.map(([v, node]) => ({
          [v]: node,
        })),
      )}
      sorter={sorter}
    />
  )
}

class TheInputSelectOptionList extends React.PureComponent {
  render() {
    const {
      disabledValues,
      full = false,
      nullable = false,
      nullText,
      onClose,
      onNull,
      onSelect,
      options,
      optionsRef,
      parser,
      placeholder,
      sorter,
      suggestingIndex,
    } = this.props
    const optionValues = Object.keys(options)
    if (optionValues.length === 0) {
      return null
    }
    return (
      <div
        className={c('the-input-select-options', {
          'the-input-select-options-full': full,
        })}
      >
        <div className='the-input-select-options-back' onClick={onClose} />
        <ul
          className='the-input-select-options-list'
          ref={optionsRef}
          role='listbox'
        >
          {nullable && (
            <li className={c('the-input-select-option')} onClick={onNull}>
              {nullText || ''}
            </li>
          )}
          {optionValues.sort(sorter).map((optionValue, i) => (
            <TheInputSelectOptionListItem
              disabled={disabledValues.includes(optionValue)}
              key={optionValue}
              onSelect={onSelect}
              role='option'
              selected={i === suggestingIndex}
              value={parser(optionValue)}
            >
              {options[optionValue]}
            </TheInputSelectOptionListItem>
          ))}
        </ul>
      </div>
    )
  }
}

class TheInputSelectOptionListItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onSelect, value } = this.props
    onSelect && onSelect({ value })
  }

  render() {
    const { children, disabled, selected, value } = this.props
    return (
      <li
        className={c('the-input-select-option', {
          'the-input-select-option-disabled': disabled,
          'the-input-select-option-selected': selected,
        })}
        data-value={value}
        onClick={this.handleClick}
        role='option'
      >
        {children}
      </li>
    )
  }
}

export default TheInputSelect
