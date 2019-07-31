'use strict'

/**
 * Test for TheTable.
 * Runs with mocha.
 */
import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheTable from '../lib/TheTable'

describe('the-table', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    const element = render(<TheTable />)
    ok(element)
  })
})

/* global describe, before, after, it */
