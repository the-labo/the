'use strict'

const { TheMetrics } = require('@the-/metrics')

async function tryExample() {
  class Person {
    hi() {
      console.log('hi!')
    }
  }

  const theMetrics = new TheMetrics({})

  theMetrics.bindMethodCallCounter('person.hi', {
    class: Person,
    method: 'hi',
  })

  const person = new Person()
  person.hi()
  person.hi()

  console.log(theMetrics.data)
}

tryExample().catch((err) => console.error(err))
