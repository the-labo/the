'use strict'

import classnames from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Group of list
 */
class TheListGroup extends React.Component {
  static Body(props) {
    let { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={classnames('the-list-group-body', className)}
      >
        {children}
      </div>
    )
  }

  static Header(props) {
    let { children, className } = props
    return (
      <h3
        {...htmlAttributesFor(props, { except: ['className'] })}
        role='heading'
        {...eventHandlersFor(props, { except: [] })}
        className={classnames('the-list-group-header', className)}
      >
        {children}
      </h3>
    )
  }

  render() {
    const { props } = this
    const { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={classnames('the-list-group', className)}
      >
        {children}
      </div>
    )
  }
}

TheListGroup.propTypes = {}

TheListGroup.defaultProps = {
  role: 'group',
}

TheListGroup.displayName = 'TheListGroup'

export default TheListGroup
