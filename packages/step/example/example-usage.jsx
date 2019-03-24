'use strict'

import React from 'react'
import { TheStep, TheStepBar, TheStepStyle } from 'the-step'
import { TheSpinStyle } from 'the-spin'
import { TheButtonStyle } from 'the-button'

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0
    }
  }

  render () {
    return (
      <div>
        <TheStepStyle/>
        <TheSpinStyle/>
        <TheButtonStyle/>

        <TheStepBar step={this.state.step}
                    onStep={(step) => this.setState({step})}
                    nodes={[
                      'The first step',
                      'The second step',
                      'The third step'
                    ]}
        />

        <TheStep step={this.state.step}
                 onStep={(step) => this.setState({step})}
                 isSubmit={this.state.step === 2}
                 submitText={'Say Yo'}
                 onSubmit={() => alert('yo')}
        >
          <TheStep.Content>
            <h1>This is content01</h1>
            <div style={{height: 300}}>This is content</div>
          </TheStep.Content>
          <TheStep.Content>
            <h1>This is content02</h1>
          </TheStep.Content>
          <TheStep.Content>
            <h1>This is content03</h1>
            <div style={{height: 240}}>This is content</div>
          </TheStep.Content>
        </TheStep>
      </div>

    )
  }
}

export default ExampleComponent
