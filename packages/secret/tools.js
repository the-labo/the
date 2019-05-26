'use strict'
/**
 * Handy tools
 * @module @the-/secret/tools
 */
const aglob = require('aglob')
const path = require('path')
const theSecret = require('./lib/create')

/**
 * Encrypt all
 * @param {string|string[]} filenames - Filenames to encrypt
 * @param {string} password - Encryption password
 * @returns {Promise<Array>}
 */
exports.encryptAll = async function encryptAll(filenames, password) {
  const results = []
  for (const filename of await aglob(filenames)) {
    await theSecret(filename, password).encrypt()
    results.push({ filename: path.relative(process.cwd(), filename) })
  }
  return results
}

/**
 * Decrypt all
 * @param {string|string[]} filenames - Filenames to encrypt
 * @param {string} password
 * @returns {Promise<Array>} - Encryption password
 */
exports.decryptAll = async function decryptAll(filenames, password) {
  const results = []
  for (const filename of await aglob(filenames)) {
    await theSecret(filename, password).decrypt()
    results.push({ filename: path.relative(process.cwd(), filename) })
  }
  return results
}
