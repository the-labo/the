/**
 * Test for TheDialog.
 * Runs with mocha.
 */
'use strict'

import TheDialog from '../lib/TheDialog'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-dialog', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheDialog />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
