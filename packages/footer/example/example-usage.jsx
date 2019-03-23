'use strict'

import React from 'react'
import { TheFooter, TheFooterStyle } from 'the-footer'
import { TheRouter } from 'the-router'

class ExampleComponent extends React.PureComponent {
  render () {
    const { Links, Link, CopyRight } = TheFooter
    return (
      <div>
        <TheRouter>
          <TheFooterStyle/>
          <TheFooter>
            <CopyRight year='2017' holder='the-labo'/>
            <Links>
              <Link to='/about/privacy-policy'>Privacy Policy</Link>
            </Links>
          </TheFooter>
        </TheRouter>
      </div>
    )
  }
}

export default ExampleComponent
