'use strict'

const { TheDB } = require('@the-/db')
const {
  DataTypes: { STRING },
} = require('@the-/resource')

const db = new TheDB({
  dialect: 'sqlite', // Uses "clay-driver-sqlite" package
  storage: 'var/my-app.db', // File path to save
})

// Define factory method for resource
// See https://github.com/realglobe-Inc/clay-resource for more detail
const User = db.defineResource(
  'User',
  // Resource policy'
  // https://github.com/realglobe-Inc/clay-policy#usage
  {
    password: { type: STRING },
    username: { type: STRING },
  },
  {
    interceptors: {
      // Convert entity attributes on inbound
      inbound(attributes) {
        const digest = () => {
          /* ... */
        }
        attributes.passwordHash = digest(attributes.password)
        return attributes
      },
      // Convert entity attributes on outbound
      outbound(attributes) {
        delete attributes.password
        return attributes
      },
    },
    // Enhance entity class
    entityClass(ResourceEntity) {
      return class UserResourceEntity extends ResourceEntity {
        get fullName() {
          const { firstName, lastName } = this
          return [firstName, lastName].filter(Boolean).join(' ')
        }
      }
    },
    // Create index to enable filter/sort with nested attributes
    indices() {
      return ['profile.name', 'profile.email']
    },
    schema() {
      return {}
    },
  },
)

async function tryExample() {
  const user = await User.create({
    password: 'Super Cool',
    username: 'Black Fire',
  })
  console.log(user)
  /* ... */
}

tryExample().catch((err) => console.error(err))
