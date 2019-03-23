'use strict'

import React from 'react'
import TheMain from '@the-/main'

const TheMainStyles = TheMain.styles({})

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <TheMain id='my-component'
                        styles={ TheMainStyles }
      />
    )
  }
}

export default ExampleComponent
