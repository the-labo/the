/**
 * DetailScene
 * @class DetailScene
 */
'use strict'

const { withBusy, withId, withReady } = require('@the-/mixin-scene/shim')
const Scene = require('./Scene')

@withId
@withBusy
@withReady
class DetailSceneBase extends Scene {}

/** @lends DetailScene */
class DetailScene extends DetailSceneBase {
  async dealWith(id) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withReady.when
  async doSync() {
    const id = this.get('id')
    const entity = await this.dealWith(id)
    this.set({ entity, missing: !entity })
  }

  async requestToSyncFor(id) {
    await this.waitWhileBusy()
    if (this.isKnownId(id)) {
      return null
    }
    this.set({ entity: null, id, missing: false })
    await this.doSync()
    return this.get('entity')
  }

  async reSyncIfCurrent(id) {
    if (this.isKnownId(id)) {
      await this.doSync()
    }
  }
}

module.exports = DetailScene
