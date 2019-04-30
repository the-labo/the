/**
 * Alias of {@link module:@the-/s3}
 * @function default
 */
'use strict'

const create = require('./create')
const TheS3 = require('./TheS3')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheS3,
})
