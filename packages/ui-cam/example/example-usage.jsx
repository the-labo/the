'use strict'

import '@the-/polyfill/apply' // Some browser needs polyfill for ImageCapture API
import React from 'react'
import { TheCam, TheCamInput, TheCamStyle } from '@the-/ui-cam'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.Component {
  handleUpdate = (v) => this.setState(v)
  start = () => {
    this.setState({ disabled: false })
  }

  state = {
    disabled: false,
    photo01: null,
  }

  stop = () => {
    this.setState({ disabled: true })
  }

  render() {
    return (
      <div>
        <TheCamStyle />
        <TheSpinStyle />
        <TheCam
          disabled={this.state.disabled}
          onStart={() => console.log('camera started')}
          onStop={() => console.log('camera stopped')}
        />

        <br />
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>

        <br />
        <hr />
        <br />
        <br />
        <br />
        <br />
        <br />
        <section>
          <h1>As Input</h1>
          <TheCamInput
            name='photo01'
            onUpdate={this.handleUpdate}
            value={this.state.photo01}
          />
        </section>
      </div>
    )
  }
}

export default ExampleComponent
