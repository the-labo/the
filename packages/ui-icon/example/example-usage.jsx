'use strict'

import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { TheIconStyle } from '@the-/ui-icon/styles'

const ExampleComponent = () => (
  <div>
    <TheIconStyle />
    <TheIcon.CdnLink />
    <hr />

    {'ABCDEF'.split('').map((theme) => (
      <TheIcon.Spin key={theme} theme={theme} />
    ))}
  </div>
)

export default ExampleComponent
