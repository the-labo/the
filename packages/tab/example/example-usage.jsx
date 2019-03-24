'use strict'

import React from 'react'
import { TheTab, TheTabStyle } from 'the-tab'
import { TheButtonStyle } from 'the-button'
import { TheSpinStyle } from 'the-spin'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 1
    }
  }

  render () {
    return (
      <div>
        <TheButtonStyle/>
        <TheSpinStyle/>
        <TheTabStyle/>
        <TheTab activeIndex={this.state.activeIndex}
                onChange={({ activeIndex }) => this.setState({ activeIndex })}
                buttons={['Tab01', 'Tab02', 'Tab03', 'Tab04']}
        >
          <TheTab.Content style={{ height: '100px' }}> This is Content 01 </TheTab.Content>
          <TheTab.Content style={{ height: '300px' }}>
            This is Content 02
            <br/>
            <a href="http://example.com">With some link</a>
          </TheTab.Content>
          <TheTab.Content spinning>
            This is Content 03

          </TheTab.Content>
          <TheTab.Content>
            This is Content 04


            <div style={{ overflow: 'auto', border: '2px solid #AAA' }}>
              <div style={{
                width: '1200px',
                whiteSpace: 'nowrap',
                padding: '22px',
                fontSize: '2em'
              }}>
                <pre>
              This is a long long long long long long long long long long long long long long long long long long long long long long long long long long long long content
                </pre>
              </div>
            </div>
          </TheTab.Content>
        </TheTab>
      </div>

    )
  }
}

export default ExampleComponent
