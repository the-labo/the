'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheMenuItem from './TheMenuItem'

/**
 * Menu of the-components
 */
const TheMenu = (props) => {
  const { children, className, grid } = props

  return (
    <ul
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-menu', className, {
        'the-menu-grid': grid,
      })}
    >
      {children}
      <li className='the-menu-end' role='menuitem' />
    </ul>
  )
}

TheMenu.Item = TheMenuItem

TheMenu.propTypes = {
  /** Grid layout */
  grid: PropTypes.bool,
}

TheMenu.defaultProps = {
  grid: false,
  role: 'menu',
}

TheMenu.displayName = 'TheMenu'

export default TheMenu
