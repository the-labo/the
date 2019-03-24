/**
 * Test for TheRouter.
 * Runs with mocha.
 */
'use strict'

import TheRouter from '../lib/TheRouter'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from '@the-/script-test'

describe('the-router', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
      <TheRouter />
    )
    ok(element)

    let context = {}
    let element2 = render(
      <TheRouter.Static context={context}/>
    )
    ok(element2)

    let element3 = render(
      <TheRouter.Hash />
    )
    ok(element3)
  })
})

/* global describe, before, after, it */
