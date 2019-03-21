/**
 * Convert into handle scene class
 * @memberOf module:@the-/handle
 * @function toHandleSceneClass
 */
'use strict'

/** @lends toHandleSceneClass */
function toHandleSceneClass(BaseClass, config = {}) {
  const { load } = config

  class HandleSceneClass extends BaseClass {
    /**
     * Load sub scenes
     * @param {function} SceneClass - Scope class to load
     * @param {...string} names - Sub names
     */
    load(SceneClass, ...names) {
      return load(SceneClass, this.name, ...names)
    }
  }

  return HandleSceneClass
}

module.exports = toHandleSceneClass
