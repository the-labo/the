'use strict'
const theSecret = require('@the-/secret')

async function tryExample() {
  const secret = theSecret('./secrets.json', 'xxxxxxxxxxxx')

  await secret.encrypt()
  await secret.decrypt()
}

tryExample().catch((err) => console.error(err))
