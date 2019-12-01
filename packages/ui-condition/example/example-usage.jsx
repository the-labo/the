'use strict'

import React from 'react'
import { TheCondition } from '@the-/ui-condition'
import { TheConditionStyle } from '@the-/ui-condition/styles'

const ExampleComponent = () => {
  const value = 1
  return (
    <div>
      <TheConditionStyle />
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

export default ExampleComponent
