/**
 * Resource for the DB
 * @memberOf module:@the-/resource
 * @class TheResource
 * @extends TheResourceBase
 * @extends ClayResource
 * @extends module:@the-/resource.mixins.ListenMix~ListenMixed
 * @extends module:@the-/resource.mixins.queueMix~QueueMixed
 * @extends module:@the-/resource.mixins.writeOnceMix~WriteOnceMixed
 */
'use strict'

const { Collection } = require('clay-collection')
const { ClayResource } = require('clay-resource')
const { create: clayResourceName } = require('clay-resource-name')
const { listenMix, queueMix, writeOnceMix } = require('./mixins')

/**
 * @memberOf module:@the-/resource
 * @protected
 * @class TheResourceBase
 */
const TheResourceBase = [listenMix, queueMix].reduce(
  (Class, mix) => mix(Class),
  ClayResource,
)

/** @lends module:@the-/resource.TheResource */
class TheResource extends TheResourceBase {
  /**
   * Cascade destroy condition
   * @example
   * class MyResource extends TheResource
   *   get cascaded () {
   *     return { User: (ref) => ({user: {$ref: ref}}) }
   *   }
   * }
   */
  static get cascaded() {
    return {}
  }

  constructor(...args) {
    super(...args)
    this.db = null
    this.closed = false
  }

  get resourceName() {
    return clayResourceName(this)
  }

  close() {
    this.db = null
    this.removeAllListeners()
    this.closed = true
  }

  /**
   * Get ref of id
   * @param id - Id (or may be an entity)
   * @returns {string|Object}
   */
  refOf(id) {
    if (!id) {
      throw new Error(`[TheResource.refOf] id is required`)
    }
    const { $ref } = arguments[0]
    if ($ref) {
      return $ref
    }
    return super.refOf(id)
  }

  /**
   * Create empty list
   * @returns {Promise<lib.Collection>}
   */
  async emptyList() {
    return new Collection()
  }

  /**
   * Get invalidated attributes
   * @param {Object} attributes
   * @returns {Promise<Object>}
   */
  async invalidated(attributes) {
    return null
  }

  /**
   * Refresh clay entity
   * @param {Entity} entity
   * @returns {Promise<undefined>}
   */
  async refresh(entity) {
    if (!entity) {
      return null
    }
    const values = await this.invalidated({ ...entity })
    if (values === null) {
      return null
    }
    if (typeof values === 'undefined') {
      console.warn(
        `[TheResource][${
          this.resourceName
        }] You should return \`null\` or valid object from \`.invalidated(attributes)\``,
      )
      return null
    }
    const hasChange = Object.entries(values).some(([k, v]) => entity[k] !== v)
    if (!hasChange) {
      return null
    }
    return entity.update(values)
  }

  /**
   * Refresh all
   * @returns {Promise<undefined>}
   */
  async refreshAll() {
    await this.each(async (v) => {
      await this.refresh(v)
    })
  }

  /**
   * Resave all
   * @returns {Promise<undefined>}
   */
  async resaveAll() {
    await this.each(async (entity) => {
      await entity.update({ $$at: new Date() }, { allowReserved: true })
    })
  }
}

module.exports = Object.assign(TheResource, {
  WriteOnce: class TheResourceWriteOnce extends writeOnceMix(TheResource) {},
})
