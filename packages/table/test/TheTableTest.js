/**
 * Test for TheTable.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTable from '../lib/TheTable'

describe('the-table', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheTable />)
    ok(element)
  })
})

/* global describe, before, after, it */
