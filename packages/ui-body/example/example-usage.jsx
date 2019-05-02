'use strict'

import React from 'react'
import { TheBody, TheBodyStyle } from '@the-/ui-body'
import { TheHtml } from '@the-/ui-html'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <TheHtml>
        <TheBodyStyle />
        <TheBody />
      </TheHtml>
    )
  }
}

export default ExampleComponent
