'use strict'

import React from 'react'
import { TheCycle } from '@the-/ui-cycle'

class ExampleComponent extends React.Component {
  state = {
    tickAt: null,
    tickCount: 0,
    someOtherValue: 'foo'
  }

  onMount = () => {
    this.tickTimer = setInterval(() => this.setState({
      tickAt: new Date(),
      tickCount: this.state.tickCount + 1
    }), 1000)
  }

  onUnmount = () => {
    clearTimeout(this.tickTimer)
  }

  onReceive = (diff, currentValues, prevValues) => {
    console.log('received', diff)
  }

  render () {
    return (
      <div>
        <TheCycle onMount={this.onMount}
                  onUnmount={this.onUnmount}
                  onReceive={this.onReceive}
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
