'use strict'

import React from 'react'
import { TheRoute } from '@the-/ui-route'
import { TheRouter } from '@the-/ui-router'

class ExampleComponent extends React.Component {
  render() {
    return (
      <TheRouter>
        <TheRoute path='/foo'>
          <div>hoge</div>
        </TheRoute>
      </TheRouter>
    )
  }
}

export default ExampleComponent
