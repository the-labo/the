// Code generated by coz. DO NOT EDIT.
/**
 * @module @the-/ps
 * @version 15.4.1
 * @description Process manager for the-framework
 * @typicalname ps
 * @license MIT
 */
'use strict'

const ThePS_ = require('./ThePS')
const acquire_ = require('./acquire')
const create_ = require('./create')
const default__ = require('./default')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.ThePS = ThePS_
exports.acquire = acquire_
exports.create = create_

module.exports = default__
