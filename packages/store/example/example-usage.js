'use strict'

const theStore = require('@the-/store')
const { Scope } = theStore

// Scoped state class
class CounterScope extends Scope {
  // Define initial state
  static get initialState() {
    return 0
  }

  // Define reducer factory
  static get reducerFactories() {
    return {
      increment(amount) {
        return (state) => state + amount
      },
    }
  }
}

async function tryExample() {
  let store = theStore()

  // Create state instance and attach to the store
  store.load(CounterScope, 'counterA')
  store.load(CounterScope, 'counterB')

  {
    // Access to loaded store
    let { counterA } = store

    // Each instance has dispatcher methods which share signatures with reducerFactories
    // Invoking this method dispatches an action and reduce it into state
    // The action looks like { type: "counterA/increment", payload: [1] }
    counterA.increment(1)

    // Access to the scoped state
    console.log(counterA.state) // -> 1
  }

  // Store it self has all state
  console.log(store.state) // -> { counterA: 1 }
}

tryExample().catch((err) => console.error(err))
