'use strict'

import React from 'react'
import TheHtml from '@the-/ui-html'

class ExampleHtml extends React.PureComponent {
  render () {
    let styles = TheHtml.styles({})
    return (
      <TheHtml styles={styles}/>
    )
  }
}

export default ExampleHtml
