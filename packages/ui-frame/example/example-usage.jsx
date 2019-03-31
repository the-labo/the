'use strict'

import React from 'react'
import { TheFrame, TheFrameStyle } from '@the-/ui-frame'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheSpinStyle/>
        <TheFrameStyle/>
        <TheFrame src='./example-html.html'
                  style={{with: '200px', height: '200px', overflow: 'auto'}}
        />

        <hr/>

        <TheFrame src='./example-html.html'
                  style={{with: '200px', height: '200px', overflow: 'auto'}}
                  spinning
        />

        <hr/>


        <h3>Embed</h3>
        <TheFrame src='./example-html.html'
                  embed
                  style={{with: '200px', height: '200px', overflow: 'auto'}}
        />
      </div>

    )
  }
}

export default ExampleComponent
