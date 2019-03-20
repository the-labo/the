'use strict'

const { ThePack } = require('the-pack')

async function tryExample () {

  const { decode, encode } = new ThePack()

  const encoded = encode({ foo: 'bar' })
  const decoded = decode(encoded)
  console.log('decoded', decoded)
}

tryExample().catch((err) => console.error(err))
