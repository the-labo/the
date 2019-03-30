/**
 * Test for withDebug.
 * Runs with mocha.
 */
'use strict'

const withDebug = require('../lib/withDebug')
const {ok, equal} = require('assert')

describe('with-debug', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const Foo =
      class FooImpl extends withDebug(class {
        getBar () {}
      }) {
        doSomething () {
          return {
            obj: {a: {b: {c: {d: 1}}}},
            arr: new Array(2000).fill(null).map((_, i) => ({i}))
          }
        }

        controllerWillAttach () {

        }

        get hoge () {
          console.log('dynamic getter hoge called')
          return 'hoge'
        }
      }
    const foo = new Foo()
    foo._debug.enabled = true
    foo.controllerWillAttach()
    ok(foo.doSomething('foo', 'bar', 'baz'))
    equal(foo.doSomething.name, 'debugProxy')
    equal(foo.doSomething.original.name, 'doSomething')
    equal(foo.hoge, 'hoge')
  })
})

/* global describe, before, after, it */
