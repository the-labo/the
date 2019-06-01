// Code generated by coz. DO NOT EDIT.
/**
 * @description HTTP/RPC Server of the-framework
 * @license MIT
 * @module @the-/server
 * @typicalname server
 * @version 15.4.8
 */
'use strict'

const TheServer_ = require('./TheServer')
const adapters_ = require('./adapters')
const asControllerModule_ = require('./asControllerModule')
const assert_ = require('./assert')
const buildInEndpoints_ = require('./buildInEndpoints')
const constants_ = require('./constants')
const create_ = require('./create')
const helpers_ = require('./helpers')
const mixins_ = require('./mixins')
const stores_ = require('./stores')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheServer = TheServer_
exports.adapters = adapters_
exports.asControllerModule = asControllerModule_
exports.assert = assert_
exports.buildInEndpoints = buildInEndpoints_
exports.constants = constants_
exports.create = create_
exports.helpers = helpers_
exports.mixins = mixins_
exports.stores = stores_

module.exports = default__
