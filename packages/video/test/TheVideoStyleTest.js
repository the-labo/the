/**
 * Test for TheVideoStyle.
 * Runs with mocha.
 */
'use strict'

import TheVideoStyle from '../lib/TheVideoStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-video-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheVideoStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
