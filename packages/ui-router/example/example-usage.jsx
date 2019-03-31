'use strict'

import React from 'react'
import { TheRouter } from '@the-/ui-router'
import { TheRoute } from '@the-/route'

class ExampleComponent extends React.Component {
  render () {
    return (
      <TheRouter>
        <TheRoute path='/foo'>
          <div>
            hoge
          </div>
        </TheRoute>
      </TheRouter>
    )
  }
}

export default ExampleComponent
