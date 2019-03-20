/**
 * @class TheCache
 */
'use strict'

const LRUCache = require('lru-cache')

/** @lends TheCache */
class TheCache extends LRUCache {}

module.exports = TheCache
