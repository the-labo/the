'use strict'

import React from 'react'
import { ThePager, ThePagerStyle } from '@the-/ui-pager'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    s.state = {page: 2}
  }

  render () {
    const s = this
    let {state} = s
    return (
      <div>
        <ThePagerStyle/>
        <ThePager.Row>
          <ThePager total={8}
                    page={state.page}
                    size={3}
                    onChange={(e) => s.setState({page: e.page})}>
          </ThePager>
          <ThePager.Counts counts={{limit: 25, offset: 25, total: 52}}/>
        </ThePager.Row>

        <hr/>

        <ThePager total={15}
                  page={state.page}
                  size={5}
                  hrefPattern='?page=:page'>
        </ThePager>
      </div>

    )
  }
}

export default ExampleComponent
