'use strict'

import React from 'react'
import { TheKeyboard, TheKeyboardStyle } from '@the-/ui-keyboard'

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pressed: [],
    }
  }

  handleKeyPress = (key) => {
    this.setState({
      pressed: [...this.state.pressed, key],
    })
  }

  render() {
    return (
      <div>
        <TheKeyboardStyle />
        <div>{this.state.pressed.join('')}</div>
        <TheKeyboard
          keys={[
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [null, 0, null],
          ]}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    )
  }
}

export default ExampleComponent
