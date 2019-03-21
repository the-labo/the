'use strict'

const theStore = require('the-store').default
const {ObjectScope, BooleanScope} = theStore

async function tryExample () {
  const store = theStore()

  // Create nested scope
  store.load(ObjectScope, 'scopeA')
  store.load(BooleanScope, 'scopeA', 'enabled')

  {
    const {scopeA} = store

    scopeA.set('foo', 'bar')
    scopeA.enabled.toggle(true)

    console.log(scopeA.enabled.state) // -> true
    console.log(scopeA.state) // -> { foo: 'bar' }
  }

  console.log(store.state) // -> { scopeA: { foo: 'bar'} , 'scopeA.enabled': true } }
}

tryExample().catch((err) => console.error(err))
