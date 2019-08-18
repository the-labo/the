'use strict'

const { cleanup } = require('asobj')
const uriBuilder = require('mongo-uri-builder')
const { MongoClient, ObjectID } = require('mongodb')
const debug = require('debug')('the:driver:mongo')

/**
 * Mixin of mongodb
 * @memberof module:@the-/driver-mongo.mixins
 * @function mongoMix
 * @param Class
 * @returns {*}
 */
function mongoMix(Class) {
  class MongoMixed extends Class {
    enhanceMongoCollection(c) {
      return c
    }

    mongoObjectId(id) {
      if (!id) {
        return new ObjectID()
      }

      return new ObjectID(String(id))
    }

    async connectToMongo({
      database,
      host = 'localhost',
      password,
      port = '27017',
      username,
    }) {
      const uri = uriBuilder(
        cleanup({
          host,
          options: {},
          password,
          port,
          username,
        }),
      )
      debug('Connecting database:', uri)
      const client = await new Promise((resolve, reject) => {
        MongoClient.connect(
          uri,
          {
            useNewUrlParser: true,
          },
          (err, client) => (err ? reject(err) : resolve(client)),
        )
      })
      const db = client.db(database)
      db.client = client
      db.close = () => client.close()
      return db
    }
  }

  return MongoMixed
}

module.exports = mongoMix
