'use strict'

import React from 'react'
import { TheBar, TheActionBar, TheBarStyle } from '@the-/ui-bar'
import { TheButtonStyle } from '@the-/ui-button'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      action: true,
    }
    this.toggleAction = this.toggleAction.bind(this)
  }

  toggleAction() {
    this.setState((prevState) => ({ action: !prevState.action }))
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
          lead='doSomething'
          hidden={!this.state.action}
          buttons={{ yes: 'say yes!', no: 'say no!' }}
          handlers={{
            yes: () => console.log('yes'),
            no: () => console.log('no'),
          }}
        />
      </div>
    )
  }
}

export default ExampleComponent
