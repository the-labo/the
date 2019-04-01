/**
 * Test for TheCamStyle.
 * Runs with mocha.
 */
'use strict'

import TheCamStyle from '../lib/TheCamStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('the-cam-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCamStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
