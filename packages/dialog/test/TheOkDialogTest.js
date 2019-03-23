/**
 * Test for TheOkDialog.
 * Runs with mocha.
 */
'use strict'

import TheOkDialog from '../lib/TheOkDialog'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-ok-dialog', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheOkDialog />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
