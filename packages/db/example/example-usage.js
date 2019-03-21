'use strict'

const {
  DataTypes: { STRING },
  TheResource,
} = require('the-resource-base')
const { TheDB } = require('@the-/db')

// Define a resource class
// See https://github.com/realglobe-Inc/clay-resource for more detail
class UserResource extends TheResource {
  // Create index to enable filter/sort with nested attributes
  static get indices() {
    return ['profile.name', 'profile.email']
  }

  // Resource policy
  // https://github.com/realglobe-Inc/clay-policy#usage
  static get policy() {
    return {
      password: { type: STRING },
      username: { type: STRING },
    }
  }

  // Enhance entity class
  static entityClass(ResourceEntity) {
    return class UserResourceEntity extends ResourceEntity {
      get fullName() {
        let { firstName, lastName } = this
        return [firstName, lastName].filter(Boolean).join(' ')
      }
    }
  }

  // Convert entity attributes on inbound
  static inbound(attributes) {
    const digest = () => {
      /* ... */
    }
    attributes.passwordHash = digest(attributes.password)
    return attributes
  }

  // Hook after entity create
  static onCreate(created) {
    console.log('Entity created:', created)
  }

  // Hook after entity destroy
  static onDestroyed(destroyed) {
    console.log('Entity destroyed:', destroyed)
  }

  // Hook after entity update
  static onUpdate(updated) {
    console.log('Entity updated:', updated)
  }

  // Convert entity attributes on outbound
  static outbound(attributes) {
    delete attributes.password
    return attributes
  }
}

const db = new TheDB({
  dialect: 'sqlite', // Uses "clay-driver-sqlite" package
  storage: 'var/my-app.db', // File path to save
})

db.load(UserResource, 'User')

// Using defined database

async function tryExample() {
  // Use the connected resource
  const { User } = db.resources
  let user = await User.create({
    password: 'Super Cool',
    username: 'Black Fire',
  })
  /* ... */
}

tryExample().catch((err) => console.error(err))
