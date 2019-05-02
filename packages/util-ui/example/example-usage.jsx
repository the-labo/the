'use strict'

import classnames from 'classnames'
import React from 'react'
import { htmlAttributesFor } from '@the-/util-ui'

class ExampleComponent extends React.PureComponent {
  render() {
    const s = this
    const { props } = s
    return (
      <div
        {...htmlAttributesFor(props, { except: 'className' })}
        className={classnames('example', props.className)}
      >
        This is the example!
      </div>
    )
  }
}

export default ExampleComponent
