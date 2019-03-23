/**
 * Test for TheScene.
 * Runs with mocha.
 */
'use strict'

const { equal, ok, throws } = require('assert')
const {
  scopes: { ScopeScope, StringScope },
} = require('@the-/scope')
const { TheStore } = require('@the-/store')
const TheScene = require('../lib/TheScene')

describe('the-scene-base', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheScene)
    const scene = new TheScene({})
    ok(scene)

    const store = new TheStore({})
    const scope = store.load(ScopeScope, 'scope')
    const s1 = scope.load(StringScope, 's1')
    s1.set('v')

    {
      class Scene extends TheScene {
        get scope() {
          return scope
        }
      }

      const scene = new Scene({ foo: 'bar' })
      equal(scene.foo, 'bar')

      ok(scene.get('s1'))
      ok(scene.has('s1'))
      s1.del()
      ok(!scene.has('s1'))

      throws(() => scene.get('zz'))
    }

    s1.init()
  })
})

/* global describe, before, after, it */
