'use strict'

const { TheDB } = require('@the-/db')
const { TheResource } = require('@the-/resource')

class UserResource extends TheResource {
  /* ... */
}

const db = new TheDB({
  /* ... */
})

db.load(UserResource, 'User')

// Using defined database

async function tryExample() {
  // Migration scripts
  const migrations = {
    async '1.0.0'(db) {
      /* ... */
      await db.updateVersion('1.0.1')
    },
    // Called only if no migration has ever executed
    async none(db) {
      const {
        resources: { User },
      } = db

      // Migration scripts
      await User.each(async (user) => {
        const { username } = user
        await user.update({ name: username, username: null })
      })
      /* ... */
      await db.updateVersion('1.0.0') // Update to next version
    },
  }
  await db.migrate(migrations)
}

tryExample().catch((err) => console.error(err))
