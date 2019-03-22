/**
 * Shared action handler
 * @memberOf module:@the-/handle
 * @param {Object} attributes - Props value to share with scenes
 * @param {Object} [options={}] - optional settings
 * @class TheHandle
 */
'use strict'

const { unlessProduction } = require('@the-/check')
const helpers = require('./helpers')
const toHandleSceneClass = require('./toHandleSceneClass')
const NAMEPATH_SEPARATOR = '.'

const shortNameOfScene = (n) => n && n.replace(/_scene$|Scene$/, '')

const { allMethodNames, setByNamepath } = helpers

/** @lends TheHandle */
class TheHandle {
  constructor(config) {
    const { attributes = {}, scenes = {} } = config

    this.scenes = {}
    this.attributes = {}
    this.setAttributes(attributes)
    this.loadFromMapping(scenes)
  }

  initAll() {
    const scenes = Object.entries(this.scenes)
      .filter(([, scene]) => scene.scope && scene.init)
      .sort(([a], [b]) =>
        shortNameOfScene(a).localeCompare(shortNameOfScene(b)),
      )
    for (const [name, scene] of scenes) {
      scene.init()
    }
  }

  /**
   * Load a scene
   * @param {function} SceneClass - Scope class to instantiate
   * @param {...string} names - Name key path
   * @returns {TheHandle.Scene} Loaded scope
   */
  load(SceneClass, ...names) {
    const { attributes } = this

    unlessProduction(({ ok }) => {
      ok(typeof SceneClass !== 'string', 'SceneClass must be an constructor')
      names.map((name) => ok(typeof name === 'string', 'Names must be string'))
    })

    const namepath = names.join(NAMEPATH_SEPARATOR)
    const duplicate = Boolean(this.scenes[namepath])
    if (duplicate) {
      throw new Error(
        `[TheHandle] Scene with name "${namepath}" is already loaded!`,
      )
    }
    const isReservedName = this[namepath]
    if (isReservedName) {
      throw new Error(
        `[TheHandle] Failed to load state with name "${namepath}" because it is reserved`,
      )
    }

    const HandleSceneClass = toHandleSceneClass(SceneClass, {
      load: this.load.bind(this),
    })

    const scene = new HandleSceneClass(
      Object.assign({}, attributes, { name: namepath }),
    )
    setByNamepath(this, namepath, scene)
    const methodNames = allMethodNames(scene)

    for (const methodName of methodNames) {
      const attributesKey = [namepath, methodName].join(NAMEPATH_SEPARATOR)
      this[attributesKey] = scene[methodName].bind(scene)
    }
    this.scenes[namepath] = scene
    return scene
  }

  /**
   * Load scenes from mapping
   * @param {Object.<string, function>} SceneMapping - Scene name and constructors
   */
  loadFromMapping(SceneMapping) {
    const load = (Scene, ...names) => {
      if (typeof Scene === 'object') {
        for (const [subName, subScene] of Object.entries(Scene)) {
          load(subScene, ...[...names, subName])
        }
      } else {
        this.load(Scene, ...names)
      }
    }

    for (const [name, Scene] of Object.entries(SceneMapping)) {
      load(Scene, name)
    }
  }

  /**
   * Set attributes value. All attributes will be shared in scenes
   * @param {Object} attributes
   */
  setAttributes(attributes) {
    this.attributes = Object.assign({}, this.attributes, attributes)
    for (const scene of Object.values(this.scenes)) {
      Object.assign(scene, attributes)
    }
    for (const [name, value] of Object.entries(attributes)) {
      if (this[name]) {
        throw new Error(
          `You can not set attribute with name: "${name}" because it already exists`,
        )
      }
      Object.defineProperty(this, name, {
        get() {
          return value
        },
      })
    }
  }
}

module.exports = TheHandle