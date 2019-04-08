'use strict'

import React from 'react'
import { TheIcon, TheIconStyle } from '@the-/ui-icon'

class ExampleComponent extends React.Component {
  render() {
    return (
      <div>
        <TheIconStyle />
        <TheIcon.CdnLink />
        <hr />

        {'ABCDEF'.split('').map((theme) => (
          <TheIcon.Spin key={theme} theme={theme} />
        ))}
      </div>
    )
  }
}

export default ExampleComponent
