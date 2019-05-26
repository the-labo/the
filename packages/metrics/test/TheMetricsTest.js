'use strict'
/**
 * Test for TheMetrics.
 * Runs with mocha.
 */
const {
  strict: { deepStrictEqual: deepEqual },
} = require('assert')
const TheMetrics = require('../lib/TheMetrics')

describe('the-metrics', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    class Person {
      constructor(name = 'Tom') {
        this.name = name
      }

      foo() {
        console.log(`foo, this is ${this.name}`)
      }

      hi() {
        console.log(`hi, this is ${this.name}`)
      }

      yo() {
        console.log(`yo, this is ${this.name}`)
      }
    }

    const theMetrics = new TheMetrics({})
    theMetrics.bindMethodCallCounter('person.hi', {
      class: Person,
      methodName: 'hi',
    })
    theMetrics.bindMethodCallCounter('person.foo', {
      class: Person,
      methodName: 'foo',
    })
    theMetrics.bindMethodCallCounter('person.yo', {
      class: Person,
      methodName: 'yo',
    })

    const person = new Person()
    person.hi()
    person.hi()
    person.yo()
    person.foo()

    deepEqual(theMetrics.data, {
      'person.foo': 1,
      'person.hi': 2,
      'person.yo': 1,
    })

    theMetrics.flush()
  })
})

/* global describe, before, after, it */
