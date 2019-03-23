'use strict'

import React from 'react'
import TheHtml from '@the-/html'
import TheHead from '@the-/head'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <TheHtml>
        <TheHead id='my-component'
        />
      </TheHtml>
    )
  }
}

export default ExampleComponent
