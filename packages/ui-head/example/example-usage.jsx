'use strict'

import React from 'react'
import TheHtml from '@the-/ui-html'
import TheHead from '@the-/ui-head'

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
