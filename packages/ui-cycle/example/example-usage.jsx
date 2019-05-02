'use strict'

import React from 'react'
import { TheCycle } from '@the-/ui-cycle'

class ExampleComponent extends React.Component {
  onMount = () => {
    this.tickTimer = setInterval(
      () =>
        this.setState({
          tickAt: new Date(),
          tickCount: this.state.tickCount + 1,
        }),
      1000,
    )
  }

  onReceive = (diff) => {
    console.log('received', diff)
  }

  onUnmount = () => {
    clearTimeout(this.tickTimer)
  }

  state = {
    someOtherValue: 'foo',
    tickAt: null,
    tickCount: 0,
  }

  render() {
    return (
      <div>
        <TheCycle
          onMount={this.onMount}
          onReceive={this.onReceive}
          onUnmount={this.onUnmount}
          values={this.state}
        >
          <h3>This a cycled component</h3>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </TheCycle>
      </div>
    )
  }
}

export default ExampleComponent
