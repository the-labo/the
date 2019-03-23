'use strict'

import React from 'react'
import { TheContainer, TheContainerStyle } from 'the-container'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheContainerStyle />
        <TheContainer id='my-component'
        />
      </div>
    )
  }
}

export default ExampleComponent
