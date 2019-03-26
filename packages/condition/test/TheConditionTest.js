/**
 * Test for TheCondition.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheCondition from '../lib/TheCondition'

describe('the-condition', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    ok(
      render(
        <TheCondition if={true}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      !render(
        <TheCondition if={false}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      !render(
        <TheCondition unless={true}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      render(
        <TheCondition unless={false}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      render(
        <TheCondition someOf={[true, false, false]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      !render(
        <TheCondition someOf={[false, false, false]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      render(
        <TheCondition someOf={[true, false, false]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      render(
        <TheCondition allOf={[true, true, true]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      !render(
        <TheCondition allOf={[true, true, false]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
    ok(
      !render(
        <TheCondition allOf={[false, false, false]}>
          <div>hoge</div>
        </TheCondition>,
      ),
    )
  })
})

/* global describe, before, after, it */
