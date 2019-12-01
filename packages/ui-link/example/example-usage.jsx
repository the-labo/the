'use strict'

import React from 'react'
import { TheLink } from '@the-/ui-link'
import { TheLinkStyle } from '@the-/ui-link/styles'
import { TheRouter } from '@the-/ui-router'

const ExampleComponent = () => (
  <TheRouter.Hash>
    <TheLinkStyle />
    <TheLink to='/mypage'>My Page</TheLink>
    <TheLink icon='fa fa-info' to='/about'>
      About
    </TheLink>

    <TheLink color='#38E' to='/hoge'>
      Color link
    </TheLink>

    <TheLink color='#38E' to='http://example.com'>
      External link
    </TheLink>
  </TheRouter.Hash>
)

export default ExampleComponent
