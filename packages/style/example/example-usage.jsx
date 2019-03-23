'use strict'

import React from 'react'
import { TheStyle } from '@the-/style'

// Customize style theme

TheStyle.theme.DOMINANT_COLOR = '#38E'
TheStyle.theme.TEXT_COLOR = '#555'

class ExampleComponent extends React.PureComponent {
  render () {
    let styles = TheStyle.styles({
      body: {
        color: '#555',
        backgroundColor: 'white'
      }
    })
    return (
      <TheStyle id='my-component'
                styles={styles}
      />
    )
  }
}

export default ExampleComponent
