'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Group of buttons
 */
class TheButtonGroup extends React.Component {
  render() {
    const { props } = this
    const { align, children, className, collapsed, nowrap } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-button-group', className, {
          'the-button-group-center': align === 'center',
          'the-button-group-collapsed': collapsed,
          'the-button-group-left': align === 'left',
          'the-button-group-nowrap': nowrap,
          'the-button-group-right': align === 'right',
        })}
      >
        {children}
      </div>
    )
  }
}

TheButtonGroup.propTypes = {
  /** collapsed style */
  /** Direction to align */
  align: PropTypes.oneOf(['left', 'right', 'center']),
  collapsed: PropTypes.bool,
}

TheButtonGroup.defaultProps = {
  align: 'center',
  collapsed: false,
}

TheButtonGroup.displayName = 'TheButtonGroup'

export default TheButtonGroup
