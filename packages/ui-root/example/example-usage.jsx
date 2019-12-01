'use strict'

import React from 'react'
import { TheRoot } from '@the-/ui-root'
import { TheRootStyle } from '@the-/ui-root/styles'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheRootStyle />
        <TheRoot id='my-component' />
      </div>
    )
  }
}

export default ExampleComponent
