'use strict'
const { TheScope } = require('@the-/scope')
const { TheStore } = require('@the-/store')

async function tryExample() {
  class FlgScope extends TheScope {
    static get initialState() {
      return false
    }

    static get reducerFactories() {
      return {
        toggle(value) {
          return (state) => (typeof value === 'undefined' ? !state : value)
        },
      }
    }
  }

  const store = new TheStore()
  store.load(FlgScope, 'flg')
  store.flg.toggle(true)
  console.log(store.flg.state) // -> true
}

tryExample().catch((err) => console.error(err))
