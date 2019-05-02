'use strict'

import React from 'react'
import { TheRepeatable, TheRepeatableStyle } from '@the-/ui-repeatable'
import { TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render() {
    const data = new Array(25)
      .fill(null)
      .map((_, i) => ({ id: i, name: `data-${i}` }))
    return (
      <div>
        <TheSpinStyle />
        <TheRepeatableStyle />
        <TheRepeatable
          data={data}
          render={(data) => <div>This is data: {data.name}</div>}
          spinning={false}
        />

        <h3>Horizontal</h3>
        <TheRepeatable
          data={data}
          horizontal
          render={(data) => <div>This is data: {data.name}</div>}
          spinning={false}
        />

        <h3>Spinning</h3>
        <TheRepeatable
          data={data}
          render={(data) => <div>This is data: {data.name}</div>}
          spinning={true}
        />

        <h3>Empty</h3>
        <TheRepeatable
          data={[]}
          render={(data) => <div>This is data: {data.name}</div>}
          spinning={false}
        />
      </div>
    )
  }
}

export default ExampleComponent
