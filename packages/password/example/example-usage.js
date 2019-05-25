'use strict'
const thePassword = require('@the-/password')

async function tryExample() {
  const { digest, generatePassword, generateSalt } = thePassword()

  const salt = generateSalt()
  const password = generatePassword()

  const passwordHash = digest(password, salt)
  console.log({ password, passwordHash })
  /* ... */
}

tryExample().catch((err) => console.error(err))
