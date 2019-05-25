'use strict'
const theClient = require('@the-/client')

async function tryExample() {
  const client = theClient.for('app')

  const fruitShop = await client.use('fruitShop')

  await fruitShop.buy()
}

tryExample().catch((err) => console.error(err))
