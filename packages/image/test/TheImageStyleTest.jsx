/**
 * Test for TheImageStyle.
 * Runs with mocha.
 */
'use strict'

import TheImageStyle from '../lib/TheImageStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-image-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheImageStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
