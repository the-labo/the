/**
 * CreateScene
 * @class CreateScene
 */
'use strict'

const { clone } = require('asobj')
const { withBusy, withEntry, withResult } = require('@the-/mixin-scene/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withResult
class InputSceneBase extends Scene {}

/** @lends InputScene */
class InputScene extends InputSceneBase {
  static entitySkipFields = [/^\$/]

  setEntryErrors(e) {
    console.error('entry error', e)
    this.setEntryErrors.set(e)
  }

  setEntryFromEntity(entity) {
    const values = clone(entity || {}, {
      without: this.constructor.entitySkipFields,
    })
    this.setEntry(values)
  }

  async dealWith(values) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withResult.save
  async doExec() {
    return this.processEntry((values) => this.dealWith(values))
  }
}

module.exports = InputScene
