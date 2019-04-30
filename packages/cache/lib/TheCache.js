/**
 * @memberOf module:@the-/cache
 * @class TheCache
 * @extends LRUCache
 * @see https://github.com/isaacs/node-lru-cache#readme
 */
'use strict'

const LRUCache = require('lru-cache')

/** @lends module:@the-/cache.TheCache */
class TheCache extends LRUCache {}

module.exports = TheCache
