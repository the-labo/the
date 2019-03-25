/**
 * Test for TheView.
 * Runs with mocha.
 */
'use strict'

import TheView from '../lib/TheView'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-view', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheView />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
