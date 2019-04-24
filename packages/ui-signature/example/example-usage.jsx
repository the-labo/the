'use strict'

import React from 'react'
import { TheSignatureInput, TheSignatureStyle } from '@the-/ui-signature'

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      s1: null,
    }
  }

  render () {
    return (
      <div>
        <TheSignatureStyle/>
        <TheSignatureInput onUpdate={(v) => this.setState(v)}
                           name={'s1'}
                           value={this.state.s1}
        >
        </TheSignatureInput>
      </div>

    )
  }
}

export default ExampleComponent
