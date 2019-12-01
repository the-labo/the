'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { TheLink } from '@the-/ui-link'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Menu of the-components
 */
const TheMenuItem = (props) => {
  const { active, children, className, icon, text, to } = props

  const Inner = to ? TheLink : 'span'
  return (
    <li
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-menu-item', className, {
        'the-menu-item-active': active,
      })}
    >
      <Inner className='the-menu-item-inner' to={to}>
        <TheIcon className={c('the-menu-item-icon', icon)} />
        <span className='the-menu-item-text'>{text}</span>
        <span className='the-menu-item-children'>{children}</span>
      </Inner>
    </li>
  )
}

TheMenuItem.propTypes = {
  /** Active or not */
  active: PropTypes.bool,
  /** Icon class name */
  icon: PropTypes.string,
  /** Link to */
  to: PropTypes.string,
}

TheMenuItem.defaultProps = {
  active: false,
  icon: null,
  role: 'menuitem',
  to: null,
}

TheMenuItem.displayName = 'TheMenuItem'

export default TheMenuItem
