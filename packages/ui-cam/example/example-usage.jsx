'use strict'

import 'the-polyfill/apply' // Some browser needs polyfill for ImageCapture API
import React from 'react'
import { TheCam, TheCamStyle, TheCamInput } from 'the-cam'
import { TheSpinStyle } from 'the-spin'

class ExampleComponent extends React.Component {
  state = {
    disabled: false,
    photo01: null,
  }
  start = () => {
    this.setState({ disabled: false })
  }
  stop = () => {
    this.setState({ disabled: true })
  }

  handleUpdate = (v) => this.setState(v)

  render () {
    return (
      <div>
        <TheCamStyle/>
        <TheSpinStyle/>
        <TheCam onStart={() => console.log('camera started')}
                onStop={() => console.log('camera stopped')}
                disabled={this.state.disabled}
        >
        </TheCam>

        <br/>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>

        <br/>
        <hr/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <section>
          <h1>As Input</h1>
          <TheCamInput value={this.state.photo01}
                       name={'photo01'}
                       onUpdate={this.handleUpdate}
          >
          </TheCamInput>
        </section>
      </div>

    )
  }
}

export default ExampleComponent
