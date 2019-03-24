'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { newId } from '@the-/util-component'
import TheInputText from './TheInputText'

class TheInputPinCode extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      index: 0,
    }
    this.id = newId()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleBack() {}

  handleBlur(e) {
    const { onBlur } = this.props

    onBlur && onBlur(e)
    this.setState({
      focused: false,
    })
  }

  handleEnter(e) {
    const { onEnter } = this.props
    onEnter && onEnter(e)
  }

  handleFocus(e) {
    const { onFocus, value } = this.props
    onFocus && onFocus(e)
    this.setState({
      focused: true,
      index: value.length,
    })
  }

  handleItemClick(index) {
    this.setState({
      index,
    })
    const { name, onUpdate, value } = this.props
    if (value.length > index) {
      onUpdate && onUpdate({ [name]: value.substr(0, index) })
    }
  }

  handleKeyDown(e) {
    const { onKeyDown } = this.props
    switch (e.keyCode) {
      case 13:
        this.handleEnter()
        break
      case 8:
        this.handleBack()
        break
      default:
        break
    }
    onKeyDown && onKeyDown(e)
  }

  handleUpdate(values) {
    const { digit, name, only, onUpdate, value } = this.props
    const newValue = String(values[name])
      .split('')
      .filter((v) => (only ? only.test(v) : !!v))
      .join('')
      .trim()
      .slice(0, digit)
    if (value === newValue) {
      return
    }
    onUpdate &&
      onUpdate({
        [name]: newValue,
      })
    this.setState({
      index: newValue.length,
    })
  }

  render() {
    const { props } = this
    const inputProps = clone(props, { without: ['digit'] })
    const { focused, index } = this.state
    const { digit, id = this.id, name, value } = props
    return (
      <TheInputText
        {...inputProps}
        className={c('the-input-pin-code', {
          'the-input-pin-code-focused': focused,
        })}
        id={`${id}-text`}
        inputRef={this.handleInputRef}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onUpdate={this.handleUpdate}
        value={props.value}
      >
        <div className='the-input-pin-code-display'>
          {new Array(digit).fill(null).map((_, i) => (
            <TheInputPinCodeItem
              htmlFor={`${id}-text`}
              index={i}
              key={i}
              onClick={this.handleItemClick}
              selected={focused && index === i}
              value={(props.value || '')[i]}
            />
          ))}
        </div>
      </TheInputText>
    )
  }
}

class TheInputPinCodeItem extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { index, onClick } = this.props
    onClick && onClick(index)
  }

  render() {
    const { htmlFor, selected, value } = this.props
    return (
      <label
        className={c('the-input-pin-code-item', {
          'the-input-pin-code-item-selected': selected,
        })}
        htmlFor={htmlFor}
        onClick={this.handleClick}
      >
        {value || ''}
      </label>
    )
  }
}

TheInputPinCode.propTypes = Object.assign(
  clone(TheInputText.propTypes, { without: [] }),
  {
    digit: PropTypes.number.isRequired,
    only: PropTypes.any,
  },
)
TheInputPinCode.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, { without: [] }),
  {
    digit: 4,
    only: /\d/,
  },
)
TheInputPinCode.displayName = 'TheInputPinCode'

export default TheInputPinCode
