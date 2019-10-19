'use strict'

import c from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * ToastGroup
 */
const TheToastGroup = (props) => {
  const { children, className } = props

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-toast-group', className)}
    >
      {children}
    </div>
  )
}

TheToastGroup.propTypes = {}

TheToastGroup.defaultProps = {}

TheToastGroup.displayName = 'TheToastGroup'

export default TheToastGroup
