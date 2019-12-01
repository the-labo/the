'use strict'

import React from 'react'
import { TheActionBar, TheBar } from '@the-/ui-bar'
import { TheBarStyle } from '@the-/ui-bar/styles'
import { TheButtonStyle } from '@the-/ui-button/styles'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      action: true,
    }
    this.toggleAction = this.toggleAction.bind(this)
  }

  render() {
    return (
      <div>
        <a onClick={this.toggleAction}>Toggle Action bar</a>
        <br />
        <TheButtonStyle />
        <TheBarStyle />
        <TheBar id='my-component' />

        <TheActionBar
          buttons={{ no: 'say no!', yes: 'say yes!' }}
          handlers={{
            no: () => console.log('no'),
            yes: () => console.log('yes'),
          }}
          hidden={!this.state.action}
          lead='doSomething'
        />
      </div>
    )
  }

  toggleAction() {
    this.setState((prevState) => ({ action: !prevState.action }))
  }
}

export default ExampleComponent
