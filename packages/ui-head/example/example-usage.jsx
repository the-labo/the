'use strict'

import React from 'react'
import TheHead from '@the-/ui-head'
import TheHtml from '@the-/ui-html'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <TheHtml>
        <TheHead id='my-component' />
      </TheHtml>
    )
  }
}

export default ExampleComponent
