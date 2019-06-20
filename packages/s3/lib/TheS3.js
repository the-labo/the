'use strict'
/**
 * @memberof module:@the-/s3
 * @class TheS3
 * @param {Object} config
 * @param {string} [config.accessKeyId]
 * @param {string} [config.bucket]
 * @param {string} [config.region]
 * @param {string} [config.secretAccessKey]
 * @param {string} [config.signatureVersion]
 */
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const mime = require('mime')
const path = require('path')
const { promisify } = require('util')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check')
const readFileAsync = promisify(fs.readFile)

const assert = theAssert('TheS3')

/** @lends module:@the-/s3.TheS3 */
class TheS3 {
  constructor(config) {
    const {
      accessKeyId,
      bucket: Bucket,
      region = 'ap-northeast-1',
      secretAccessKey,
      signatureVersion = 'v4',
      ...rest
    } = config

    unlessProduction(() => {
      assert(accessKeyId, 'accessKeyId is required')
      assert(secretAccessKey, 'secretAccessKey is required')
      const restKeys = Object.keys(rest)
      if (restKeys.length > 0) {
        console.warn('[TheS3] Unknown configurations:', restKeys)
      }
    })

    this.s3 = new S3({
      accessKeyId,
      params: { Bucket },
      region,
      secretAccessKey,
      signatureVersion,
    })
  }

  /**
   * Upload file into s3
   * @param {string} src - Source file
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<undefined>}
   */
  async upload(src, options = {}) {
    const {
      name = path.basename(src),
      namespace = 'uploaded',
      type = null,
    } = options
    const Body = typeof src === 'string' ? await readFileAsync(src) : src
    const { s3 } = this
    const Key = path.join(...[namespace, name].filter(Boolean))
    const ContentType =
      type || (typeof src === 'string' ? mime.getType(src) : null)
    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Body,
          ContentType,
          Key,
        },
        (err, data) => {
          if (err) {
            reject(err)
            return
          }
          const { Bucket: bucket, ETag: etag, Key: key, Location: url } = data
          resolve({ bucket, etag, key, url })
        },
      )
    })
  }
}

module.exports = TheS3
