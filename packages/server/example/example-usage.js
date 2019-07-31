'use strict'

const React = require('react')
const theServer = require('@the-/server')

const { createElement: c } = React

;(async () => {
  // Define RPC Controller Class
  const FruitShopCtrl = ({ session }) => ({
    async addToCart(name, amount = 1) {
      const { cart = {} } = session
      cart[name] = (cart[name] || 0) + amount
      session.cart = cart
    },

    async buy() {
      const { cart = {} } = session
      console.log(cart)
      /* ... */
    },
  })

  // Define real time event handling stream
  const CountdownStream = ({ params }) => ({
    async *provide() {
      let count = params.count || 100
      while (count > 0) {
        yield { count }
        count--
      }
    },
  })

  const server = theServer({
    // Register controller with name
    // Controller instance will be created for each method call
    controllers: {
      fruitShop: FruitShopCtrl,
    },
    /**
     * Redis config
     */
    redis: { db: 1, host: '127.0.0.1', port: '6379' },
    /**
     * Directory path to serve static files
     */
    static: 'public',
    streams: {
      countdown: CountdownStream,
    },

    /**
     * View renderer
     * @param {*} children
     */
    html: ({ children }) => c('html', {}, c('body', {}, children)),
  })

  await server.listen(3000)
})().catch((e) => console.error(e))
