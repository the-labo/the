/**
 * Test for TheButton.
 * Runs with mocha.
 */
'use strict'

import TheButton from '../lib/TheButton'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-button', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheButton />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
