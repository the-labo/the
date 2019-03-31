'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/icon'
import TheInputText from './TheInputText'

class TheInputSearch extends React.PureComponent {
  constructor(props) {
    super(props)
    let { open = false } = props
    this.state = {
      open,
    }
    this._focusTimer = -1
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimer)
  }

  handleFocus(e) {
    const { props } = this
    let { onFocus } = props
    onFocus && onFocus(e)
    this.toggleOpen(true)
  }

  render() {
    const { props, state } = this
    let { value } = props
    let { open } = state
    return (
      <TheInputText
        {...props}
        className={c('the-input-search', {
          'the-input-search-open': open || !!value,
        })}
        inputRef={(input) => {
          this.input = input
        }}
        onFocus={() => this.handleFocus()}
        type='search'
      >
        {!value && (
          <a
            className={c('the-input-search-toggle')}
            onClick={() => this.toggleOpen()}
            tabIndex={-1}
          >
            <TheIcon className={TheInputSearch.SEARCH_ICON} />
          </a>
        )}
      </TheInputText>
    )
  }

  toggleOpen(open) {
    if (typeof open === 'undefined') {
      open = !this.state.open
    }
    if (open === this.state.open) {
      return
    }
    this.setState({ open })
    clearTimeout(this._focusTimer)
    this._focusTimer = setTimeout(() => {
      if (open && this.input) {
        this.input.focus()
      }
    })
  }
}

TheInputSearch.SEARCH_ICON = 'fa fa-search'
TheInputSearch.propTypes = clone(TheInputText.propTypes, { without: ['type'] })
TheInputSearch.defaultProps = clone(TheInputText.defaultProps, {
  without: ['type'],
})
TheInputSearch.displayName = 'TheInputSearch'

export default TheInputSearch
