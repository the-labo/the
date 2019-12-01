'use strict'

import React from 'react'
import { TheInfo } from '@the-/ui-info'
import { TheInfoStyle } from '@the-/ui-info/styles'

const ExampleComponent = () => (
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

export default ExampleComponent
