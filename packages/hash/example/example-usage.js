'use strict'

const { TheHash } = require('@the-/hash')

async function tryExample () {
  const hash = new TheHash()
  hash.a = 1
  ok(hash.has('a'))
  const a = hash.get('a')
  console.log(a)

  const p = hash.toProxy({ unknownCheck: true })
  p.x // Emits unknown warning
}

tryExample().catch((err) => console.error(err))
