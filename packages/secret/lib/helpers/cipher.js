'use strict'

/**
 * @memberof module:@the-/secret.helpers
 * @namespace cipher
 */
const crypto = require('crypto')

const TEXT_ENCODE = 'utf-8'
const CRYPTO_ENCODE = 'hex'
const KEY_LENGTH = 32

exports.cipherText = function cipher(algorithm, password, text, options = {}) {
  const { iv = null } = options
  if (!iv) {
    // For old format data
    const cipher = crypto.createCipher(algorithm, password) // eslint-disable-line node/no-deprecated-api
    return (
      cipher.update(text, TEXT_ENCODE, CRYPTO_ENCODE) +
      cipher.final(CRYPTO_ENCODE)
    )
  }
  const key = password.padStart(KEY_LENGTH, 'x')
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  return (
    cipher.update(text, TEXT_ENCODE, CRYPTO_ENCODE) +
    cipher.final(CRYPTO_ENCODE)
  )
}

exports.decipherText = function decipher(
  algorithm,
  password,
  encrypted,
  options = {},
) {
  const { iv = null } = options
  if (!iv) {
    // For old format data
    const decipher = crypto.createDecipher(algorithm, password) // eslint-disable-line node/no-deprecated-api
    return (
      decipher.update(encrypted, CRYPTO_ENCODE, TEXT_ENCODE) +
      decipher.final(TEXT_ENCODE)
    )
  }
  const key = password.padStart(KEY_LENGTH, 'x')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  return (
    decipher.update(encrypted, CRYPTO_ENCODE, TEXT_ENCODE) +
    decipher.final(TEXT_ENCODE)
  )
}
