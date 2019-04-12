'use strict'

import c from 'classnames'
import React from 'react'

class TheKeyboardButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onClick, value } = this.props
    onClick && onClick(value)
  }

  render() {
    const { value } = this.props
    return (
      <a
        className={c('the-keyboard-button', {
          'the-keyboard-button-empty': value === null,
        })}
        href='javascript:void(0)'
        onClick={this.handleClick}
      >
        {value}
      </a>
    )
  }
}

export default TheKeyboardButton