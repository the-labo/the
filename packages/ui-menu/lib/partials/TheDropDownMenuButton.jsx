'use strict'

import c from 'classnames'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

export default function TheDropDownMenuButton(props) {
  const { children, className, icon, onClick } = props
  return (
    <a
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-dropdown-menu-button', className)}
      onClick={onClick}
      role='menubar'
    >
      <span className='the-dropdown-menu-button-text'>{children}</span>
      <TheIcon className={c('the-dropdown-menu-button-icon', icon)} />
    </a>
  )
}
