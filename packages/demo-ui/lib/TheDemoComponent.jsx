/**
 * Demo of the-components
 * @memberof module:@the-/demo-component
 * @class TheDemoComponent
 * @extends React.Component
 */
'use strict'

import c from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/** @lends TheDemoComponent */
class TheDemoComponent extends React.Component {
  render() {
    const { props } = this
    const { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-demo-component', className)}
      >
        {children}
      </div>
    )
  }
}

TheDemoComponent.propTypes = {}

TheDemoComponent.defaultProps = {}

TheDemoComponent.displayName = 'TheDemoComponent'

export default TheDemoComponent
