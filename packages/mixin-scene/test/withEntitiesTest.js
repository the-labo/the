/**
 * Test for withEntities.
 * Runs with mocha.
 */
'use strict'

const withEntities = require('../lib/withEntities')
const {ok, equal} = require('assert')

describe('with-entities', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    const C = withEntities(
      class A {
        constructor () {
          this.entities = []
        }

        get (key) {
          return this[key]
        }
        
        set (values) {
          Object.assign(this, values)
        }
      }
    )
    const c = new C()
    c.addEntities([{id: 1}, {id: 2}])
    c.addEntities([{id: 2}, {id: 3}])
    c.addEntity({id: 4})
    equal(c.getEntities().length, 4)

    c.deleteEntity({id: 2})
    equal(c.getEntities().length, 3)
  })
})

/* global describe, before, after, it */
