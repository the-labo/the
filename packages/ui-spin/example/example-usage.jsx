'use strict'

import React from 'react'
import { TheSpin, TheSpinStyle } from '@the-/ui-spin'

class ExampleComponent extends React.PureComponent {
  render () {
    let spinStyle = {width: 120, height: 180, display: 'inline-block'}
    return (
      <div>
        <TheSpinStyle/>
        <span style={spinStyle}><TheSpin size='xx-large' theme='A' enabled={true}/></span>
        <span style={spinStyle}><TheSpin size='xx-large' theme='B' enabled={true}/></span>
        <span style={spinStyle}><TheSpin size='xx-large' theme='C' enabled={true}/></span>
        <span style={spinStyle}><TheSpin size='xx-large' theme='D' enabled={true}/></span>
        <span style={spinStyle}><TheSpin size='xx-large' theme='E' enabled={true}/></span>
        <span style={spinStyle}><TheSpin size='xx-large' theme='F' enabled={true}/></span>

        <br/>

        <div style={{width: 120, height: 120, position: 'relative'}}>
          Show spinner as cover
          <TheSpin cover enabled/>
        </div>
        <br/>
        <div style={
          {display: 'block', overflowX: 'auto', height: '32px', whiteSpace: 'nowrap', paddingBottom: 16}
        }>
          {
            new Array(72).fill(0).map((_, i) => (
              <span key={i} style={{display: 'inline-block', width: '32px', height: '32px'}}>
              <TheSpin enabled={true} size='small'/>
                </span>
            ))
          }
        </div>
      </div>

    )
  }
}

export default ExampleComponent
