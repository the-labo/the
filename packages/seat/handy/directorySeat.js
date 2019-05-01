/**
 * @function directorySeat
 * @param {string} dirname
 * @param {function} mapper
 */
'use strict'

const seatAccess = require('./seatAccess')

/** @lends directorySeat */
function directorySeat(dirname, mapper) {
  const {
    containerNameFor,
    portNumberFor,
    processNameFor,
    secretFor,
  } = seatAccess()

  const methods = {
    containerNameFor: (name, ...rest) =>
      containerNameFor(`${name}@${dirname}`, ...rest),
    portNumberFor: (name, ...rest) =>
      portNumberFor(`${name}@${dirname}`, ...rest),
    processNameFor: (name, ...rest) =>
      processNameFor(`${name}@${dirname}`, ...rest),
    secretFor: (name, ...rest) => secretFor(`${name}@${dirname}`, ...rest),
  }
  return mapper(methods)
}

module.exports = directorySeat
