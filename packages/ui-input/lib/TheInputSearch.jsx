'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import TheInputText from './TheInputText'

class TheInputSearch extends React.PureComponent {
  constructor(props) {
    super(props)
    const { open = false } = props
    this.state = {
      open,
    }
    this.inputRef = React.createRef()
    this._focusTimer = -1
    this.handleFocus = this.handleFocus.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
  }
  componentWillUnmount() {
    clearTimeout(this._focusTimer)
  }
  handleFocus(e) {
    const { onFocus } = this.props
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
        inputRef={this.inputRef}
        onFocus={this.handleFocus}
        type='search'
      >
        {!value && (
          <a
            className={c('the-input-search-toggle')}
            onClick={this.toggleOpen}
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
      const input = this.inputRef.current
      if (open && input) {
        input.focus()
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
