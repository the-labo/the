'use strict'

import React from 'react'
import TheComponentDemo from '@the-/ui-demo'

const TheComponentDemoStyles = TheComponentDemo.styles({})

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <TheComponentDemo id='my-component'
                   styles={ TheComponentDemoStyles }
      />
    )
  }
}

export default ExampleComponent
