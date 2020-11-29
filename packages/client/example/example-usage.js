'use strict'

const { TheClient } = require('@the-/client')

async function tryExample() {
  const client = TheClient.for('app')

  const fruitShop = await client.use('fruitShop')

  await fruitShop.buy()
}

tryExample().catch((err) => console.error(err))
