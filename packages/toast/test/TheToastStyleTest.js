/**
 * Test for TheToastStyle.
 * Runs with mocha.
 */
'use strict'

import TheToastStyle from '../lib/TheToastStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-toast-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheToastStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
