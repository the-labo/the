'use strict'

import c from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * ToastGroup
 */
class TheToastGroup extends React.Component {
  render() {
    const {
      props,
      props: { children, className },
    } = this

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
}

TheToastGroup.propTypes = {}

TheToastGroup.defaultProps = {}

TheToastGroup.displayName = 'TheToastGroup'

export default TheToastGroup
