/**
 * Test project
 * @memberOf module:@the-/script-test
 * @function test
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
'use strict'

const amocha = require('amocha')
const argx = require('argx')

/** @lends test */
async function test(dirname = process.cwd(), options = {}) {
  let args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()
  let {
    pattern = 'test/**/+(*_test.js|*_test.jsx|*Test.js|*Test.jsx)',
    timeout = 4000,
  } = options
  const cwd = process.cwd()
  process.chdir(dirname)

  await amocha(pattern, {
    timeout,
  })
  process.chdir(cwd)
}

module.exports = test
