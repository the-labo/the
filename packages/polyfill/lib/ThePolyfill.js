'use strict'
/**
 * @memberof module:@the-/polyfill
 * @class ThePolyfill
 */
const abind = require('abind')
const helpers = require('./helpers')
const { withDocument, withWindow } = helpers

/** @lends module:@the-/polyfill.ThePolyfill */
class ThePolyfill {
  constructor() {
    abind(this)
  }

  apply() {
    withWindow((window) => {
      if (!window.fetch) {
        const crossFetch = require('cross-fetch')
        window.fetch = crossFetch
      }
      if (!window.ImageCapture) {
        require('image-capture/lib/imagecapture.js')
      }
      if (!window.global) {
        window.global = window
      }
      if (!window.process) {
        window.process = require('process/browser')
      }
    })
    if (!this.done) {
      require('core-js/stable')
      require('regenerator-runtime/runtime')
      require('proxy-polyfill/proxy.min.js')
      require('raf/polyfill')
      this.done = true
    }
    withDocument((document) => {
      const fastclick = require('fastclick')
      if (fastclick.attach) {
        fastclick.attach(document.body)
      } else {
        fastclick(document.body)
      }
    })
  }

  bind() {
    const { apply } = this
    const bound = apply.bind(this)
    return Object.assign(bound, {
      apply,
    })
  }
}

module.exports = ThePolyfill
