'use strict'

import React from 'react'
import { TheCaughtCatcher } from '@the-/ui-caught'
import { TheCaughtStyle } from '@the-/ui-caught/styles'

const ExampleComponent = () => (
  <div>
    <TheCaughtStyle />
    <TheCaughtCatcher>
      <Content />
    </TheCaughtCatcher>
  </div>
)

class Content extends React.Component {
  componentDidMount() {
    throw new Error('Something is wrong!')
  }

  render() {
    return <div>This is content</div>
  }
}

export default ExampleComponent
