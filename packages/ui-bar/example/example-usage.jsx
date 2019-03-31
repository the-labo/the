'use strict'

import React from 'react'
import { TheBar, TheActionBar, TheBarStyle } from '@the-/ui-bar'
import { TheButtonStyle } from '@the-/button'

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      action: true
    }
  }

  render () {
    return (
      <div>
        <a onClick={() => this.setState({action: !this.state.action})}>Toggle Action bar</a>
        <br/>
        <TheButtonStyle/>
        <TheBarStyle/>
        <TheBar id='my-component'>
        </TheBar>

        <TheActionBar lead='doSomething'
                      hidden={!this.state.action}
                      buttons={{yes: 'say yes!', no: 'say no!'}}
                      handlers={{yes: () => console.log('yes'), no: () => console.log('no')}}
        />
      </div>

    )
  }
}

export default ExampleComponent
