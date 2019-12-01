'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheSpinStyle } from '@the-/ui-spin/styles'
import { TheTab } from '@the-/ui-tab'
import { TheTabStyle } from '@the-/ui-tab/styles'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
    }
  }

  render() {
    return (
      <div>
        <TheButtonStyle />
        <TheSpinStyle />
        <TheTabStyle />
        <TheTab
          activeIndex={this.state.activeIndex}
          buttons={['Tab01', 'Tab02', 'Tab03', 'Tab04']}
          onChange={({ activeIndex }) => this.setState({ activeIndex })}
        >
          <TheTab.Content style={{ height: '100px' }}>
            This is Content 01
          </TheTab.Content>
          <TheTab.Content style={{ height: '300px' }}>
            This is Content 02
            <br />
            <a href='http://example.com'>With some link</a>
          </TheTab.Content>
          <TheTab.Content spinning>This is Content 03</TheTab.Content>
          <TheTab.Content>
            This is Content 04
            <div style={{ border: '2px solid #AAA', overflow: 'auto' }}>
              <div
                style={{
                  fontSize: '2em',
                  padding: '22px',
                  whiteSpace: 'nowrap',
                  width: '1200px',
                }}
              >
                <pre>
                  This is a long long long long long long long long long long
                  long long long long long long long long long long long long
                  long long long long long long content
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
