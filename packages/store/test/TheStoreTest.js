/**
 * Test for TheStore.
 * Runs with mocha.
 */
'use strict'

const TheStore = require('../lib/TheStore')
const { Scope, ObjectScope, BooleanScope, NumberScope } = TheStore
const { ok, equal, deepEqual } = require('assert').strict

describe('the-store', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheStore)

    class CounterScope extends Scope {
      static get initialState() {
        return { count: 0 }
      }

      static get reducerFactories() {
        return {
          increment(amount = 1) {
            return (state) => ({
              count: state.count + amount
            })
          },
          decrement(amount = 1) {
            return (state) => ({
              count: state.count - amount
            })
          }
        }
      }

      static get subScopeClasses() {
        return {
          busy: BooleanScope
        }
      }
    }

    let store = new TheStore({})

    store.load(CounterScope, 'counterA')
    store.load(CounterScope, 'counterB')

    {
      let { counterA, counterB } = store

      counterA.increment(1)
      counterA.increment(1)
      counterB.increment(1)
      deepEqual(store.getState().counterA, { count: 2 })
      deepEqual(store.getState().counterB, { count: 1 })
      counterA.decrement(1)
      deepEqual(store.getState().counterA, { count: 1 })
      deepEqual(store.getState().counterB, { count: 1 })
      deepEqual(counterB.state, { count: 1 })

      equal(counterA.busy.state, false)
      counterA.busy.true()
      equal(counterA.busy.state, true)
      counterA.busy.false()
      equal(counterA.busy.state, false)
    }
  })

  it('Nested scope', () => {
    let store = new TheStore({
      state: {
        'scopeB.enabled': true
      }
    })

    // Create nested scope
    const scopeA = store.load(ObjectScope, 'scopeA')
    scopeA.load(BooleanScope, 'enabled')

    const scopeB = store.load(ObjectScope, 'scopeB')
    scopeB.load(BooleanScope, 'enabled')

    deepEqual(store.state, {
      scopeA: {},
      'scopeA.enabled': false,
      scopeB: {},
      'scopeB.enabled': true
    })

    {
      let { scopeA } = store

      scopeA.set('foo', 'bar')
      scopeA.enabled.toggle(true)

      equal(scopeA.enabled.state, true)
      deepEqual(scopeA.state, { foo: 'bar' })

      scopeA.loadFromMapping({
        x: ObjectScope
      })
      ok(scopeA.x)
    }

    deepEqual(store.state, {
      scopeA: { foo: 'bar' },
      'scopeA.x': {},
      'scopeA.enabled': true,
      scopeB: {},
      'scopeB.enabled': true
    })
  })

  it('Load from defs', () => {
    const store = new TheStore({})

    store.loadFromDefs({
      _: { foo: 'BOOL' },
      _hoge: 'BOOL',
      p1: {
        o: 'OBJ',
        p2: {
          b: 'BOOL'
        }
      },
      p3: {
        $ref: '#/p1/p2',
        hoge: 'OBJ'
      },
      p4: {
        $ref: '#/p3',
        fuge: 'OBJ'
      }
    }, {
      types: {
        'OBJ': ObjectScope,
        'BOOL': BooleanScope
      }
    })

    ok(store)

    store.p1.p2.b.true()
    equal(store.p1.p2.b.state, true)
    store.p1.p2.b.false()
    equal(store.p1.p2.b.state, false)
    equal(store.p1.get('p2.b'), false)

    equal(store.p3.b.state, false)
    store.p3.hoge.set({ foo: 'bar' })
    deepEqual(store.p3.hoge.state, { foo: 'bar' })

    deepEqual(
      Object.keys(store.scopes).sort(),
      [
        'p1',
        'p1.o',
        'p1.p2',
        'p1.p2.b',
        'p3',
        'p3.b',
        'p3.hoge',
        'p4',
        'p4.b',
        'p4.fuge',
        'p4.hoge'
      ])
  })

  it('Load from defaults', () => {
    const store = new TheStore({})
    store.loadFromDefaults({
      p1: {
        o: {},
        p2: {
          b: false
        }
      }
    })

    ok(store)
    equal(store.p1.p2.b.state, false)
    store.p1.p2.b.set(true)
    equal(store.p1.p2.b.state, true)
    store.p1.p2.b.set(false)
    equal(store.p1.p2.b.state, false)
  })

  it('Nested scope scope', () => {
    const store = new TheStore({})
    store.loadScopesFromDefs({
      a: {
        b: {

          x: 'BOOL',
          y: 'OBJ',
          z: 'NUM',
        }
      }
    }, {
      types: {
        BOOL: BooleanScope,
        OBJ: ObjectScope,
        NUM: NumberScope
      }
    })

    store.a.set({ b: { z: 4 } })
    equal(store.a.b.z.state, 4)
    store.a.b.set({ z: 5 })
    equal(store.a.b.z.state, 5)
    store.a.set({ b: null })
    try {
      store.a.set({ b: void (0) })
    } catch (err) {
      ok(err)
    }
  })
})

/* global describe, before, after, it */
