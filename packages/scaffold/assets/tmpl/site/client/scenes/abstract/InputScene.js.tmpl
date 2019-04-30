/**
 * CreateScene
 * @class CreateScene
 */
'use strict'

import { withBusy, withEntry, withResult } from '@the-/mixin-scene/shim'
import Scene from './Scene'

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

  async dealWith(values) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withResult.save
  async doExec() {
    return this.processEntry((values) => this.dealWith(values))
  }
}

export default InputScene
