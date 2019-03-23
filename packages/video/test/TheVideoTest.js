/**
 * Test for TheVideo.
 * Runs with mocha.
 */
'use strict'

import TheVideo from '../lib/TheVideo'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-video', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheVideo />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
