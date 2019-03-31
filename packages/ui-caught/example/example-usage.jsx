'use strict'

import React from 'react'
import { TheCaught, TheCaughtStyle } from '@the-/ui-caught'

class ExampleComponent extends React.PureComponent {
  render () {
    return (
      <div>
        <TheCaughtStyle/>
        <TheCaught error={'Something is wrong!'}>
        </TheCaught>
      </div>

    )
  }
}

export default ExampleComponent
