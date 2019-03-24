'use strict'

import React from 'react'
import { TheRepeatable, TheRepeatableStyle } from '@the-/repeatable'
import { TheSpinStyle } from '@the-/spin'

class ExampleComponent extends React.PureComponent {
  render () {
    const data = new Array(25).fill(null).map((_, i) => ({id: i, name: `data-${i}`}))
    return (
      <div>
        <TheSpinStyle/>
        <TheRepeatableStyle/>
        <TheRepeatable spinning={false}
                       data={data}
                       render={(data, i) => (
                         <div>This is data: {data.name}</div>
                       )}
        />

        <h3>Horizontal</h3>
        <TheRepeatable spinning={false}
                       data={data}
                       horizontal
                       render={(data, i) => (
                         <div>This is data: {data.name}</div>
                       )}
        />

        <h3>Spinning</h3>
        <TheRepeatable spinning={true}
                       data={data}
                       render={(data, i) => (
                         <div>This is data: {data.name}</div>
                       )}
        />

        <h3>Empty</h3>
        <TheRepeatable spinning={false}
                       data={[]}
                       render={(data, i) => (
                         <div>This is data: {data.name}</div>
                       )}
        />
      </div>

    )
  }
}

export default ExampleComponent
