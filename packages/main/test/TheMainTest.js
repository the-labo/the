/**
 * Test for TheMain.
 * Runs with mocha.
 */
'use strict'

import TheMain from '../lib/TheMain'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-main', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheMain />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
