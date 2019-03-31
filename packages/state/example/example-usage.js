'use strict'

const { TheState } = require('@the-/state')

async function tryExample () {
  const state = new TheState()

  const account = state.scope('account')
  state.subscribe(({ account }) => {
    // Handle change
    /* ... */
  })

  account.set({ name: 'John', password: 'xxxxx' })

  console.log(account.get('name')) // John

}

tryExample().catch((err) => console.error(err))
