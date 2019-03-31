'use strict'

import classnames from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-component'
import TheBodyStyle from './TheBodyStyle'

/**
 * Body of the-components
 */
class TheBody extends React.PureComponent {
  render() {
    const { props } = this
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
}

TheBody.Style = TheBodyStyle

TheBody.propTypes = {}

TheBody.defaultProps = {}

TheBody.displayName = 'TheBody'

export default TheBody
