'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import {
  normalizeOptions,
  onOffBoolean,
  renderErrorMessage,
  renderWarningMessage,
} from './helpers'
import * as patterns from './patterns'

/**
 * Text Input
 */
class TheInputText extends React.PureComponent {
  static Options({ candidates, onSelect, parser, selectedCandidate }) {
    if (candidates.length === 0) {
      return null
    }
    return (
      <ul className='the-input-text-options' role='listbox'>
        {candidates.map((candidate) => (
          <li
            aria-label={candidate}
            className={c('the-input-text-option', {
              'the-input-text-option-selected': selectedCandidate === candidate,
            })}
            data-value={parser(candidate)}
            key={candidate}
            onClick={() => onSelect({ value: candidate })}
            role='option'
          >
            {candidate}
          </li>
        ))}
      </ul>
    )
  }

  constructor(props) {
    super(props)
    this.elm = null
    this.state = {
      candidates: [],
      committedValue: null,
      selectedCandidate: null,
      suggesting: false,
    }
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.elmRef = React.createRef()
    this._offSuggestionOffTimer = -1
  }

  commitValue() {
    const { name, onUpdate, parser, value } = this.props
    const committedValue = parser(value)
    onUpdate && onUpdate({ [name]: committedValue || '' })

    if (this.state.committedValue === committedValue) {
      return
    }
    this.setState({ committedValue })
  }

  componentDidMount() {
    const window = get('window')
    window.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    const window = get('window')
    window.removeEventListener('click', this.handleDocumentClick)
    clearTimeout(this._offSuggestionOffTimer)
  }

  enterCandidate(value) {
    const { name } = this.props
    this.handleChange({
      target: {
        name,
        value,
      },
    })
    this.offSuggestion()
  }

  getPatternWarning() {
    const { props, state } = this
    const { pattern, patternWarning, value } = props
    const { committedValue } = state
    if (!committedValue) {
      return null
    }
    if (!pattern) {
      return null
    }
    const ok = pattern.test(String(committedValue))
    if (ok) {
      return null
    }
    const willBeOK = value && pattern.test(value)
    if (willBeOK) {
      return null
    }
    return patternWarning
  }

  handleBlur(e) {
    const { onBlur } = this.props
    onBlur && onBlur(e)
    this.commitValue()
  }

  handleChange(e) {
    const { onChange, onUpdate } = this.props
    const { name, value } = e.target
    onChange && onChange(e)
    onUpdate && onUpdate({ [name]: value || '' })
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
    clearTimeout(this._offSuggestionOffTimer)
    this.setState({ suggesting: true })
    this.updateCandidates(-1)
    const { onFocus, selectOnFocus } = this.props
    onFocus && onFocus(e)

    if (selectOnFocus) {
      const elm = this.elmRef.current
      if (elm) {
        clearTimeout(this._selectOnFocusTimer)
        this._selectOnFocusTimer = setTimeout(() => {
          elm.querySelector('input').select()
        }, 10)
      }
    }
  }

  handleKeyDown(e) {
    const { onDown, onEnter, onKeyDown, onLeft, onRight, onUp } = this.props
    switch (e.keyCode) {
      case 13: {
        // Enter
        const { selectedCandidate } = this.state
        if (selectedCandidate) {
          this.enterCandidate(selectedCandidate)
        }
        onEnter && onEnter()
        break
      }
      case 37: // LEFT
        onLeft && onLeft()
        break
      case 38: // UP
        onUp && onUp()
        this.moveCandidateIndex(-1)
        break
      case 39: // RIGHT
        onRight && onRight()
        break
      case 40: // DOWN
        onDown && onDown()
        this.moveCandidateIndex(+1)
        break
      case 9: // Tab
        this.offSuggestion()
        break
      default:
        this.setState({ suggesting: true })
        break
    }
    onKeyDown && onKeyDown(e)
  }

  handleKeyPress(e) {
    const { onKeyPress } = this.props
    onKeyPress && onKeyPress(e)
  }

  handleKeyUp(e) {
    this.updateCandidates()
    const { onKeyUp } = this.props
    onKeyUp && onKeyUp(e)
  }

  moveCandidateIndex(amount) {
    const { candidates, selectedCandidate } = this.state
    if (!candidates) {
      return
    }
    const index = candidates.indexOf(selectedCandidate) + amount
    const over = index <= -1 || index >= candidates.length
    if (over) {
      return
    }
    this.updateCandidates(index)
  }

  offSuggestion(delay = 10) {
    clearTimeout(this._offSuggestionOffTimer)
    this._offSuggestionOffTimer = setTimeout(() => {
      this.setState({ suggesting: false })
    }, delay)
  }

  render() {
    const { props, state } = this
    const {
      autoFocus,
      children,
      className,
      error,
      id,
      inputRef,
      maxLength,
      name,
      parser,
      placeholder,
      prefix,
      readOnly,
      required,
      spellCheck,
      suffix,
      tabIndex,
      type,
      value,
    } = props
    let { autoCapitalize, autoComplete, autoCorrect } = props
    const { candidates, selectedCandidate, suggesting } = state
    if (!autoComplete && candidates.length >= 0) {
      autoComplete = 'off'
    }
    autoComplete = onOffBoolean(autoComplete)
    autoCapitalize = onOffBoolean(autoCapitalize)
    autoCorrect = onOffBoolean(autoCorrect)

    const warning = this.getPatternWarning()
    return (
      <div
        {...htmlAttributesFor(props, {
          except: [
            'id',
            'className',
            'type',
            'maxLength',
            'value',
            'name',
            'tabIndex',
            'required',
            'placeholder',
            'readOnly',
            'autoFocus',
            'autoComplete',
            'autoCapitalize',
            'autoCorrect',
            'spellCheck',
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
        className={c('the-input-text', className, {
          'the-input-error': !!error,
          'the-input-warn': !!warning,
        })}
        data-value={value}
        ref={this.elmRef}
      >
        {renderWarningMessage(warning)}
        {renderErrorMessage(error)}
        {children}
        {readOnly ? (
          <span className='the-input-text-readonly'>{value || ''}</span>
        ) : (
          <span className='the-input-text-input-wrap'>
            {prefix}
            <input
              autoCapitalize={autoCapitalize}
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              className='the-input-text-input'
              id={id}
              maxLength={maxLength}
              name={name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              onKeyPress={this.handleKeyPress}
              onKeyUp={this.handleKeyUp}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={inputRef}
              required={required}
              spellCheck={spellCheck}
              tabIndex={tabIndex}
              type={type}
              value={value || ''}
            />
            {suffix}
          </span>
        )}

        {!readOnly && suggesting && (
          <TheInputText.Options
            candidates={candidates}
            onSelect={({ value }) => this.enterCandidate(value)}
            parser={parser}
            selectedCandidate={selectedCandidate}
          />
        )}
      </div>
    )
  }

  updateCandidates(index) {
    let { matcher, options, value } = this.props
    options = normalizeOptions(options)
    value = value && String(value).trim()
    const { selectedCandidate } = this.state
    const candidates = Object.keys(options)
      .map((name) => options[name])
      .map((candidate) => String(candidate).trim())
      .filter((candidate) => !!candidate)
      .filter((candidate) => candidate !== value)
      .filter(
        (candidate) => !value || matcher(String(candidate), String(value)),
      )
    if (typeof index === 'undefined') {
      index = candidates.indexOf(selectedCandidate)
    }
    this.setState({
      candidates,
      selectedCandidate: candidates[index] || null,
    })
  }
}

TheInputText.propTypes = {
  /** Input error */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Options parser */
  matcher: PropTypes.func,
  /** Name of input */
  name: PropTypes.string.isRequired,
  /** Handle for down */
  onDown: PropTypes.func,
  /** Handle for enter */
  onEnter: PropTypes.func,
  /** Handle for left */
  onLeft: PropTypes.func,
  /** Handle for right */
  onRight: PropTypes.func,
  /** Handle for up */
  onUp: PropTypes.func,
  /** Handle for update */
  onUpdate: PropTypes.func.isRequired,
  /** Options */
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Value parser */
  parser: PropTypes.func,
  /** Regexp for input */
  pattern: PropTypes.instanceOf(RegExp),
  /** Warning text when pattern failed */
  patternWarning: PropTypes.string,
  /** prefix */
  prefix: PropTypes.node,
  /** suffix */
  suffix: PropTypes.node,
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Text type */
  type: PropTypes.string,
  /** Value of input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheInputText.defaultProps = {
  error: null,
  matcher: (candidate, value) =>
    candidate.indexOf(value) !== -1 ||
    candidate.toLowerCase().indexOf(value.toLowerCase()) !== -1,
  onEnter: null,
  options: {},
  parser: (v) => String(v || ''),
  pattern: null,
  patternWarning: null,
  prefix: null,
  readOnly: false,
  role: 'textbox',
  selectOnFocus: false,
  suffix: null,
  type: 'text',
  value: '',
}

TheInputText.displayName = 'TheInputText'

Object.assign(TheInputText, patterns)

export default TheInputText
