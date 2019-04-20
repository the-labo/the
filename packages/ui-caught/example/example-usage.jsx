'use strict'

import React from 'react'
import { TheCaughtCatcher, TheCaughtStyle } from '@the-/ui-caught'

class ExampleComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <TheCaughtStyle />
        <TheCaughtCatcher>
          <ExampleComponent.Content />
        </TheCaughtCatcher>
      </div>
    )
  }
  static Content = class Content extends React.Component {
    componentDidMount() {
      throw new Error('Something is wrong!')
    }
    render() {
      return <div>This is content</div>
    }
  }
}

export default ExampleComponent
