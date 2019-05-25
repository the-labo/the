'use strict'
const { TheCtrl } = require('@the-/controller')
const theServer = require('@the-/server')

async function tryExample() {
  // Create server instance
  const server = theServer({
    /* ... */
  })

  class FruitShopCtrl extends TheCtrl {
    async buy(name, amount = 1) {
      // Controller instance will be created per client
      /* ... */
      console.log(name, amount)
    }
  }

  server.register(FruitShopCtrl, 'fruitShop')

  server.listen(3000)
}

tryExample().catch((err) => console.error(err))
