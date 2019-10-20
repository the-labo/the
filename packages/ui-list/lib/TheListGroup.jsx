'use strict'

import classnames from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Group of list
 */
const TheListGroup = (props) => {
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

TheListGroup.Body = function Body(props) {
  const { children, className } = props
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

TheListGroup.Header = function Header(props) {
  const { children, className } = props
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

TheListGroup.propTypes = {}

TheListGroup.defaultProps = {
  role: 'group',
}

TheListGroup.displayName = 'TheListGroup'

export default TheListGroup
