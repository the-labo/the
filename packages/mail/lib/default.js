'use strict'
/**
 * Alias of {@link module:@the-/mail.create}
 * @memberof module:@the-/mail
 * @function default
 */
const create = require('./create')
const helpers = require('./helpers')
const TheMail = require('./TheMail')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheMail,
  helpers,
})
