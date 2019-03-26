/**
 * Test for TheYesNoDialog.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheYesNoDialog from '../lib/TheYesNoDialog'

describe('the-yes-no-dialog', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheYesNoDialog />)
    ok(element)
  })
})

/* global describe, before, after, it */
