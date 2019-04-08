'use strict'

const { readFile } = require('@the-/util-client')

async function tryExample() {
  // Read file
  {
    const file = new File([1, 2, 3], 'hoge')
    const arrayBuffer = new readFile(file)
    console.log(arrayBuffer)
    /* ... */
  }
}

tryExample().catch((err) => console.error(err))
