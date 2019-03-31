'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/icon'
import { uniqueFilter } from '@the-/util-array'
import TheInputText from './TheInputText'

class TheInputTag extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleInputRef = this.handleInputRef.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleBack() {
    const [edittingValue, ...tagValues] = this.splitValue()
    if (edittingValue.length === 0) {
      this.updateBySplitValues(['', ...tagValues.slice(1)])
    }
  }

  handleBlur(e) {
    const { onBlur } = this.props
    const [edittingValue, ...tagValues] = this.splitValue()
    if (edittingValue.length > 0) {
      this.updateBySplitValues(['', edittingValue, ...tagValues])
    }

    onBlur && onBlur(e)
    this.setState({ focused: false })
  }

  handleEnter() {
    const [edittingValue, ...tagValues] = this.splitValue()
    if (edittingValue.length > 0) {
      this.updateBySplitValues(['', edittingValue, ...tagValues.slice()])
    }
  }

  handleFocus(e) {
    const { onFocus } = this.props
    onFocus && onFocus(e)
    this.setState({ focused: true })
  }

  handleInputRef(input) {
    this.input = input
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
    const { name } = this.props
    const edittingValue = values[name]
    const [, ...tagValues] = this.splitValue()
    this.updateBySplitValues([edittingValue, ...tagValues])
  }

  removeTag(text) {
    const tagValues = this.splitValue()
    this.updateBySplitValues(tagValues.filter((tagValue) => tagValue !== text))
  }

  render() {
    const { props } = this
    const [edittingValue, ...tagValues] = this.splitValue()
    const inputProps = clone(props, {
      without: ['value', 'splitter', 'options'],
    })
    const { options } = props
    const { focused } = this.state
    return (
      <TheInputText
        {...inputProps}
        className={c('the-input-tag', {
          'the-input-tag-focused': focused,
        })}
        inputRef={this.handleInputRef}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onUpdate={this.handleUpdate}
        options={[]
          .concat(options || [])
          .filter((option) => !tagValues.includes(option))}
        value={String(edittingValue).trim()}
      >
        {tagValues
          .filter(Boolean)
          .filter(uniqueFilter())
          .reverse()
          .map((text) => (
            <span className='the-input-tag-tag' key={text}>
              <span className='the-input-tag-text'>{text}</span>
              <span
                className={c('the-input-tag-remover')}
                onClick={() => this.removeTag(text)}
              >
                <TheIcon className={TheInputTag.CLOSE_ICON} />
              </span>
            </span>
          ))}
      </TheInputText>
    )
  }

  splitValue() {
    const { splitter, value } = this.props
    const { focused } = this.state
    const split = String(value || '')
      .split(splitter)
      .reverse()
    return focused ? split : ['', ...split]
  }

  updateBySplitValues(splitValues) {
    const { name, onUpdate } = this.props
    const [edittingValue, ...tagValues] = splitValues
    const value = [edittingValue, ...tagValues.filter(uniqueFilter())]
      .reverse()
      .join(' ')
    onUpdate && onUpdate({ [name]: value })
  }
}

TheInputTag.CLOSE_ICON = 'fas fa-times'
TheInputTag.propTypes = Object.assign(
  clone(TheInputText.propTypes, { without: [] }),
  {
    splitter: PropTypes.any,
  },
)
TheInputTag.defaultProps = Object.assign(
  clone(TheInputText.defaultProps, { without: [] }),
  {
    options: [],
    splitter: /[\s,]+/,
  },
)
TheInputTag.displayName = 'TheInputTag'

export default TheInputTag
