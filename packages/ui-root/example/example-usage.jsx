'use strict'

import React from 'react'
import { TheRoot, TheRootStyle } from '@the-/ui-root'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheRootStyle/>
        <TheRoot id='my-component'
        >
        </TheRoot>
      </div>
    )
  }
}

export default ExampleComponent
