'use strict'

const React = require('react')
const theServer = require('@the-/server')
const { Ctrl, Stream } = theServer
const fs = require('fs')
const { createElement: c } = React

;(async () => {
  // Define RPC Controller Class
  class FruitShopCtrl extends Ctrl {
    async addToCart (name, amount = 1) {
      const { session } = this
      const { cart = {} } = session
      cart[name] = (cart[name] || 0) + amount
      session.cart = cart
    }

    async buy () {
      const { session } = this
      const { cart = {} } = session
      /* ... */
    }
  }

  // Define real time event handling stream
  class CountdownStream extends Stream {
    async * provide () {
      let count = this.params.count || 100
      while (count > 0) {
        yield { count: this.count }
        this.count--
      }
    }
  }

  const server = theServer({
    /**
     * Redis config
     */
    redis: { host: '127.0.0.1', port: '6379', db: 1 },
    /**
     * Directory path to serve static files
     */
    static: 'public',
    /**
     * View renderer
     * @param children
     */
    html: ({ children }) => c(
      'html',
      {},
      c('body', {}, children)
    ),
    // Register controller with name
    // Controller instance will be created for each method call
    controllers: {
      fruitShop: FruitShopCtrl
    },

    streams: {
      countdown: CountdownStream
    }
  })

  await server.listen(3000)

})().catch((e) => console.error(e))
