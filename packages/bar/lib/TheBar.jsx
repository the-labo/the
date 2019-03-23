'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'
import TheBarStyle from './TheBarStyle'

/**
 * Bar of the-component
 */
class TheBar extends React.PureComponent {
  render () {
    const { props } = this
    const {
      children,
      className,
    } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={classnames('the-bar', className)}
      >
        {children}
      </div>
    )
  }
}

TheBar.Style = TheBarStyle

TheBar.propTypes = {}

TheBar.defaultProps = {}

TheBar.displayName = 'TheBar'

export default TheBar
