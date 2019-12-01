'use strict'

import React from 'react'
import { TheSignatureInput } from '@the-/ui-signature'
import { TheSignatureStyle } from '@the-/ui-signature/styles'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      s1: null,
    }
  }

  render() {
    return (
      <div>
        <TheSignatureStyle />
        <TheSignatureInput
          name='s1'
          onUpdate={(v) => this.setState(v)}
          value={this.state.s1}
        />
      </div>
    )
  }
}

export default ExampleComponent
