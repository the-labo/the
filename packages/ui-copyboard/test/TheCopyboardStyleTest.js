/**
 * Test for TheCopyboardStyle.
 * Runs with mocha.
 */
'use strict'

import TheCopyboardStyle from '../lib/TheCopyboardStyle'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-copyboard-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheCopyboardStyle />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
