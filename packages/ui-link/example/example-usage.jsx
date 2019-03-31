'use strict'

import React from 'react'
import { TheRouter } from '@the-/ui-router'
import { TheLink, TheLinkStyle } from '@the-/ui-link'

class ExampleComponent extends React.Component {
  render () {
    return (
      <TheRouter.Hash>
        <TheLinkStyle/>
        <TheLink to='/mypage'>
          My Page
        </TheLink>
        <TheLink to='/about' icon="fa fa-info">
          About
        </TheLink>

        <TheLink to='/hoge'
                 color='#38E'>
          Color link
        </TheLink>

        <TheLink to='http://example.com'
                 color='#38E'>
          External link
        </TheLink>
      </TheRouter.Hash>
    )
  }
}

export default ExampleComponent
