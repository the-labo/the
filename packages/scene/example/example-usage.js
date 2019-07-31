'use strict'

const { TheScene } = require('@the-/scene')

async function tryExample() {
  const scene = new TheScene({ foo: 'bar' })
  console.log(scene.foo)
  /* ... */
}

tryExample().catch((err) => console.error(err))
