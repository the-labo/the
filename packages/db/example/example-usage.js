'use strict'

const {TheDB} = require('@the-/db')
const {
  TheResource,
  DataTypes: {STRING}
} = require('the-resource-base')

// Define a resource class
// See https://github.com/realglobe-Inc/clay-resource for more detail
class UserResource extends TheResource {
  // Convert entity attributes on inbound
  static inbound (attributes) {
    const digest = (password) => { /* ... */ }
    attributes.passwordHash = digest(attributes.password)
    return attributes
  }

  // Convert entity attributes on outbound
  static outbound (attributes) {
    delete attributes.password
    return attributes
  }

  // Resource policy
  // https://github.com/realglobe-Inc/clay-policy#usage
  static get policy () {
    return {
      username: {type: STRING},
      password: {type: STRING},
    }
  }

  // Create index to enable filter/sort with nested attributes
  static get indices () {
    return ['profile.name', 'profile.email']
  }

  // Enhance entity class
  static entityClass (ResourceEntity) {
    return class UserResourceEntity extends ResourceEntity {
      get fullName () {
        let {firstName, lastName} = this
        return [firstName, lastName].filter(Boolean).join(' ')
      }
    }
  }

  // Hook after entity create
  static onCreate (created) {
    console.log('Entity created:', created)
  }

  // Hook after entity update
  static onUpdate (updated) {
    console.log('Entity updated:', updated)
  }

  // Hook after entity destroy
  static onDestroyed (destroyed) {
    console.log('Entity destroyed:', destroyed)
  }
}

const db = new TheDB({
  dialect: 'sqlite', // Uses "clay-driver-sqlite" package
  storage: 'var/my-app.db' // File path to save
})

db.load(UserResource, 'User')

// Using defined database

async function tryExample () {
  // Use the connected resource
  const {User} = db.resources
  let user = await User.create({username: 'Black Fire', password: 'Super Cool'})
  /* ... */
}

tryExample().catch((err) => console.error(err))


