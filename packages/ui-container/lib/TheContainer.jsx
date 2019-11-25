'use strict'

import c from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'

/**
 * Container of the-components
 * @param props
 * @returns {*}
 */
function TheContainer(props) {
  const { children, className } = props

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      className={c('the-container', className)}
    >
      {children}
    </div>
  )
}

TheContainer.propTypes = {}

TheContainer.defaultProps = {}

TheContainer.displayName = 'TheContainer'

export default TheContainer
