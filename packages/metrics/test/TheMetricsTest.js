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
    theMetrics.bindClassMethodCallCounter('person.hi', {
      class: Person,
      methodName: 'hi',
    })
    theMetrics.bindClassMethodCallCounter('person.foo', {
      class: Person,
      methodName: 'foo',
    })
    theMetrics.bindClassMethodCallCounter('person.yo', {
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

  it('Object method', () => {
    const obj01 = {
      bar() {},
      foo() {},
    }
    const theMetrics = new TheMetrics({})
    theMetrics.bindObjectMethodCallCounter('obj01.foo', {
      methodName: 'foo',
      object: obj01,
    })
    theMetrics.bindObjectMethodCallCounter('obj01.bar', {
      methodName: 'bar',
      object: obj01,
    })
    obj01.foo()
    obj01.foo()
    obj01.bar()
    deepEqual(theMetrics.data, { 'obj01.bar': 1, 'obj01.foo': 2 })
  })
})

/* global describe, before, after, it */
