/**
 * Test for TheTable.
 * Runs with mocha.
 */
'use strict'

import TheTable from '../lib/TheTable'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-table', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <TheTable />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
