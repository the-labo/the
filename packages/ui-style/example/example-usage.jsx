'use strict'

import React from 'react'
import { TheStyle } from '@the-/ui-style'

// Customize style theme

TheStyle.theme.DOMINANT_COLOR = '#38E'
TheStyle.theme.TEXT_COLOR = '#555'

class ExampleComponent extends React.PureComponent {
  render() {
    let styles = TheStyle.styles({
      body: {
        backgroundColor: 'white',
        color: '#555',
      },
    })
    return <TheStyle id='my-component' styles={styles} />
  }
}

export default ExampleComponent
