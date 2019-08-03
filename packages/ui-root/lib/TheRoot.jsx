'use strict'

import c from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'
import TheRootStyle from './TheRootStyle'

/**
 * Root element of the-components
 */
const TheRoot = ({ children, className, ...otherProps }) => (
  <div
    {...htmlAttributesFor(otherProps, { except: ['className'] })}
    className={c('the-root', className)}
  >
    {children}
  </div>
)

TheRoot.Style = TheRootStyle

TheRoot.propTypes = {}

TheRoot.defaultProps = {
  role: null,
}

TheRoot.displayName = 'TheRoot'

export default TheRoot
