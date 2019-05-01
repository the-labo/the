/**
 * Convert into handle scene class
 * @memberOf module:@the-/handle
 * @function toHandleSceneClass
 */
'use strict'

/** @lends module:@the-/handle.toHandleSceneClass */
function toHandleSceneClass(BaseClass, config = {}) {
  const { load } = config

  /**
   * @memberOf module:@the-/handle.toHandleSceneClass
   * @inner
   */
  class HandleSceneClass extends BaseClass {
    /**
     * Load sub scenes
     * @param {Function} SceneClass - Scope class to load
     * @param {...string} names - Sub names
     */
    load(SceneClass, ...names) {
      return load(SceneClass, this.name, ...names)
    }
  }

  return HandleSceneClass
}

module.exports = toHandleSceneClass
