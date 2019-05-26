'use strict'

import c from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'
import TheRootStyle from './TheRootStyle'

/**
 * Root element of the-components
 */
class TheRoot extends React.Component {
  render() {
    const {
      props,
      props: { children, className },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        className={c('the-root', className)}
      >
        {children}
      </div>
    )
  }
}

TheRoot.Style = TheRootStyle

TheRoot.propTypes = {}

TheRoot.defaultProps = {
  role: 'application',
}

TheRoot.displayName = 'TheRoot'

export default TheRoot
