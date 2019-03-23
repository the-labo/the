'use strict'

import React from 'react'
import { TheCondition, TheConditionStyle } from 'the-condition'

class ExampleComponent extends React.PureComponent {
  render () {
    const value = 1
    return (
      <div>
        <TheConditionStyle/>
        <TheCondition if={value === 1}>
          <div>Will b render if the condition is true</div>
          <div>Can be multiple</div>
        </TheCondition>
        <TheCondition unless={value === 1}>
          <div>Will be rendered unless the condition is true</div>
          <div>Can be multiple</div>
        </TheCondition>
      </div>

    )
  }
}

export default ExampleComponent
