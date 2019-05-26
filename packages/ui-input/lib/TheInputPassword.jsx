'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import TheInputText from './TheInputText'

const TextOptions = []

class TheInputPassword extends React.PureComponent {
  constructor(props) {
    super(props)
    this.toggleShowing = this.toggleShowing.bind(this)
    this.state = {
      showing: false,
    }
  }

  render() {
    const {
      props,
      props: { value },
      state: { showing },
    } = this

    const icon = showing
      ? TheInputPassword.HIDE_ICON
      : TheInputPassword.SHOW_ICON
    return (
      <TheInputText
        {...props}
        className={c('the-input-password')}
        options={TextOptions}
        type={showing ? 'text' : 'password'}
      >
        {value && (
          <a
            className={c('the-input-password-toggle')}
            href='javascript:void(0)'
            onClick={this.toggleShowing}
            tabIndex={-1}
          >
            <TheIcon className={icon} />
          </a>
        )}
      </TheInputText>
    )
  }

  toggleShowing() {
    const showing = !this.state.showing
    this.setState({ showing })
  }
}

TheInputPassword.SHOW_ICON = 'fa fa-eye'
TheInputPassword.HIDE_ICON = 'fa fa-eye-slash'

TheInputPassword.propTypes = clone(TheInputText.propTypes, {
  without: ['type', 'options'],
})
TheInputPassword.defaultProps = Object.assign(
  {},
  clone(TheInputText.defaultProps, { without: ['type', 'options'] }),
  {
    autoCapitalize: false,
    autoCorrect: false,
    spellCheck: false,
  },
)
TheInputPassword.displayName = 'TheInputPassword'

export default TheInputPassword
