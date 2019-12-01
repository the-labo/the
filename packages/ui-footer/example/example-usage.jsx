'use strict'

import React from 'react'
import { TheFooter } from '@the-/ui-footer'
import { TheFooterStyle } from '@the-/ui-footer/styles'

const ExampleComponent = () => (
  <div>
    <TheFooterStyle />
    <TheFooter>
      <TheFooter.CopyRight holder='the-labo' />
    </TheFooter>
  </div>
)

export default ExampleComponent
