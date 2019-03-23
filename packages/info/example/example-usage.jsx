'use strict'

import React from 'react'
import { TheInfo, TheInfoStyle } from 'the-info'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheInfoStyle/>
        <TheInfo
          title="This is title"
          data={{
            row01: 'Text as row',
            row03: 'Hidden row',
            row02: <a>Node as row</a>,
          }}
          keys={['row02', 'row01']}
        >
        </TheInfo>
      </div>

    )
  }
}

export default ExampleComponent
