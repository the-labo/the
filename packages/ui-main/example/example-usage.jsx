'use strict'

import React from 'react'
import { TheMain, TheMainStyles } from '@the-/ui-main'

class ExampleComponent extends React.PureComponent {
  render() {
    return <TheMain id='my-component' styles={TheMainStyles} />
  }
}

export default ExampleComponent
