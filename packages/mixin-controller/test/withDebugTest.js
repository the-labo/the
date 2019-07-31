'use strict'

/**
 * Test for withDebug.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const withDebug = require('../lib/withDebug')

describe('with-debug', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const Foo = class FooImpl extends withDebug(
      class {
        getBar() {}
      },
    ) {
      get hoge() {
        console.log('dynamic getter hoge called')
        return 'hoge'
      }

      controllerWillAttach() {}

      doSomething() {
        return {
          arr: new Array(2000).fill(null).map((_, i) => ({ i })),
          obj: { a: { b: { c: { d: 1 } } } },
        }
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
