'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button'
import { TheSpinStyle } from '@the-/ui-spin'
import { TheStep, TheStepBar, TheStepStyle } from '@the-/ui-step'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
    }
  }

  render() {
    return (
      <div>
        <TheStepStyle />
        <TheSpinStyle />
        <TheButtonStyle />

        <TheStepBar
          nodes={[
            'The first step',
            'The second step',
            'The third step',
            'The fourth step',
          ]}
          onStep={(step) => this.setState({ step })}
          step={this.state.step}
        />

        <TheStep
          isSubmit={this.state.step === 2}
          onStep={(step) => this.setState({ step })}
          onSubmit={() => alert('yo')}
          step={this.state.step}
          submitText='Say Yo'
        >
          <TheStep.Content>
            <h1>This is content01</h1>
            <div style={{ height: 300 }}>This is content</div>
          </TheStep.Content>
          <TheStep.Content>
            <h1>This is content02</h1>
          </TheStep.Content>
          <TheStep.Content>
            <h1>This is content03</h1>
            <div style={{ height: 240 }}>This is content</div>
          </TheStep.Content>
        </TheStep>
      </div>
    )
  }
}

export default ExampleComponent

/* global alert */
