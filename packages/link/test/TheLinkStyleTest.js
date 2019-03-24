/**
 * Test for TheLinkStyle.
 * Runs with mocha.
 */
'use strict'

import TheLinkStyle from '../lib/TheLinkStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-link-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheLinkStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
