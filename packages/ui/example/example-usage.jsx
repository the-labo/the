'use strict'

import React from 'react'
import { TheContainer, TheHeader, TheMain, TheRoot } from '@the-/ui'

class Example extends React.Component {
  render() {
    return (
      <div>
        <TheRoot>
          <TheHeader />
          <TheMain>
            <TheContainer />
          </TheMain>
        </TheRoot>
      </div>
    )
  }
}

export default Example
