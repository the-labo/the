'use strict'

import React from 'react'
import { TheSpin, TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render() {
    let spinStyle = { display: 'inline-block', height: 180, width: 120 }
    return (
      <div>
        <TheSpinStyle />
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='A' />
        </span>
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='B' />
        </span>
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='C' />
        </span>
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='D' />
        </span>
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='E' />
        </span>
        <span style={spinStyle}>
          <TheSpin enabled={true} size='xx-large' theme='F' />
        </span>

        <br />

        <div style={{ height: 120, position: 'relative', width: 120 }}>
          Show spinner as cover
          <TheSpin cover enabled />
        </div>
        <br />
        <div
          style={{
            display: 'block',
            height: '32px',
            overflowX: 'auto',
            paddingBottom: 16,
            whiteSpace: 'nowrap',
          }}
        >
          {new Array(72).fill(0).map((_, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', height: '32px', width: '32px' }}
            >
              <TheSpin enabled={true} size='small' />
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default ExampleComponent
