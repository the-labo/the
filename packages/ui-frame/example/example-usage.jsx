'use strict'

import React from 'react'
import { TheFrame, TheFrameStyle } from '@the-/ui-frame'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheSpinStyle />
        <TheFrameStyle />
        <TheFrame
          src='./example-html.html'
          style={{ height: '200px', overflow: 'auto', with: '200px' }}
        />

        <hr />

        <TheFrame
          spinning
          src='./example-html.html'
          style={{ height: '200px', overflow: 'auto', with: '200px' }}
        />

        <hr />

        <h3>Embed</h3>
        <TheFrame
          embed
          src='./example-html.html'
          style={{ height: '200px', overflow: 'auto', with: '200px' }}
        />
      </div>
    )
  }
}

export default ExampleComponent
