'use strict'

import React from 'react'
import { TheHtml } from '@the-/ui-html'
import { TheBody, TheBodyStyle } from '@the-/ui-body'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <TheHtml>
        <TheBodyStyle/>
        <TheBody>
        </TheBody>
      </TheHtml>
    )
  }
}

export default ExampleComponent
