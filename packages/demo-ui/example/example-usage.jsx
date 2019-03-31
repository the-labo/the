'use strict'

import React from 'react'
import { TheDemoComponent, TheDemoComponentStyle } from '@the-/demo-ui'

class ExampleComponent extends React.Component {
  render () {
    return (
      <div>
        <TheDemoComponentStyle/>
        <TheDemoComponent>
        </TheDemoComponent>
      </div>

    )
  }
}

export default ExampleComponent
