'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React, { useCallback, useState } from 'react'
import TheIcon from '@the-/ui-icon/shim/TheIcon'
import TheInputText from './TheInputText'

const TextOptions = []

const TheInputPassword = React.memo((props) => {
  const [showing, setShowing] = useState(false)
  const toggleShowing = useCallback(() => {
    setShowing(!showing)
  }, [setShowing, showing])
  const { value } = props

  const icon = showing ? TheInputPassword.HIDE_ICON : TheInputPassword.SHOW_ICON
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
          onClick={toggleShowing}
          tabIndex={-1}
        >
          <TheIcon className={icon} />
        </a>
      )}
    </TheInputText>
  )
})

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
