'use strict'

const theSeal = require('the-seal')

async function tryExample () {
  const SECRET_PASSWORD = 'xxxxxxxxxxxxxxxxx'
  const {seal, verify} = theSeal(SECRET_PASSWORD)

  const values = {name: 'Bess', age: 28}

  const proof = seal(values)
  console.log(verify(proof, values)) // -> true

  values.age -= 4
  console.log(verify(proof, values)) // -> false because value modified
}

tryExample().catch((err) => console.error(err))
