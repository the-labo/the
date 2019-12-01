'use strict'

import React from 'react'
import { TheAlt } from '@the-/ui-alt'
import { TheAltStyle } from '@the-/ui-alt/styles'

const ExampleComponent = () => (
  <div>
    <TheAltStyle />
    <TheAlt enabled text='This is visible' />
    <TheAlt text='This is not visible' />
  </div>
)

export default ExampleComponent
