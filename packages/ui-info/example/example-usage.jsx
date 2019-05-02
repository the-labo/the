'use strict'

import React from 'react'
import { TheInfo, TheInfoStyle } from '@the-/ui-info'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheInfoStyle />
        <TheInfo
          data={{
            row01: 'Text as row',
            row02: <a>Node as row</a>,
            row03: 'Hidden row',
          }}
          keys={['row02', 'row01']}
          title='This is title'
        />
      </div>
    )
  }
}

export default ExampleComponent
