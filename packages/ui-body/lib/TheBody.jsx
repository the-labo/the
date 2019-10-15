'use strict'

import classnames from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'
import TheBodyStyle from './TheBodyStyle'

/**
 * Body of the-components
 */
const TheBody = (props) => {
  const { children, className } = props

  return (
    <body
      {...htmlAttributesFor(props, { except: ['className'] })}
      className={classnames('the-body', className)}
    >
      {children}
    </body>
  )
}

TheBody.Style = TheBodyStyle

TheBody.propTypes = {}

TheBody.defaultProps = {}

TheBody.displayName = 'TheBody'

export default TheBody
