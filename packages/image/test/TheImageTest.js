/**
 * Test for TheImage.
 * Runs with mocha.
 */
'use strict'

import TheImage from '../lib/TheImage'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-image', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheImage />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
