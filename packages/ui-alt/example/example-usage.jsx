'use strict'

import React from 'react'
import { TheAlt, TheAltStyle } from '@the-/ui-alt'

class ExampleComponent extends React.Component {
  render() {
    return (
      <div>
        <TheAltStyle />
        <TheAlt enabled text='This is visible' />
        <TheAlt text='This is not visible' />
      </div>
    )
  }
}

export default ExampleComponent
