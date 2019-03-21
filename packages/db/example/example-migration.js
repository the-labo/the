'use strict'

const {TheDB} = require('the-db')
const {
  TheResource,
  DataTypes: {STRING, /*....*/},
} = require('the-resource-base')

class UserResource extends TheResource {
  /* ... */
}

const db = new TheDB({/* ... */})

db.load(UserResource, 'User')

// Using defined database

async function tryExample () {

  // Migration scripts
  const migrations = {

    // Called only if no migration has ever executed
    async 'none' (db) {
      const {User} = db.resources

      // Migration scripts
      await User.each(async (user) => {
        const {username} = user
        await user.update({name: username, username: null})
      })
      /* ... */

      await db.updateVersion('1.0.0') // Update to next version
    },

    async '1.0.0' (db) {
      /* ... */
      await db.updateVersion('1.0.1')
    }
  }
  await db.migrate(migrations)
}

tryExample().catch((err) => console.error(err))


