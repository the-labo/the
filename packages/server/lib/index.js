// Code generated by coz. DO NOT EDIT.
/* eslint-disable */
/**
 * @description HTTP/RPC Server of the-framework
 * @license MIT
 * @module @the-/server
 * @typicalname server
 * @version 16.1.0
 */
'use strict'

const TheServer_ = require('./TheServer')
const adapters_ = require('./adapters')
const assert_ = require('./assert')
const buildInEndpoints_ = require('./buildInEndpoints')
const connectors_ = require('./connectors')
const constants_ = require('./constants')
const create_ = require('./create')
const helpers_ = require('./helpers')
const stores_ = require('./stores')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheServer = TheServer_
exports.adapters = adapters_
exports.assert = assert_
exports.buildInEndpoints = buildInEndpoints_
exports.connectors = connectors_
exports.constants = constants_
exports.create = create_
exports.helpers = helpers_
exports.stores = stores_

module.exports = default__
