'use strict'

const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const mime = require('mime')
const path = require('path')
const { promisify } = require('util')
const theAssert = require('@the-/assert')
const { unlessProduction } = require('@the-/check-env')

const readFileAsync = promisify(fs.readFile)

const assert = theAssert('TheS3')

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
    this.bucketName = Bucket
    this.s3 = new S3({
      accessKeyId,
      params: { Bucket },
      region,
      secretAccessKey,
      signatureVersion,
    })
  }

  /**
   * Copy file in s3
   * @param {Object} sourceParams - params for source file
   * @param {Object} targetParams - params for target file
   * @returns {Promise<Object>}
   */
  async copy(sourceParams, targetParams) {
    const sourceKey = path.join(
      ...[sourceParams.namespace, sourceParams.name].filter(Boolean),
    )
    const targetKey = path.join(
      ...[targetParams.namespace, targetParams.name].filter(Boolean),
    )
    const { bucketName, s3 } = this
    const CopySource = path.join(bucketName, sourceKey)
    return new Promise((resolve, reject) => {
      s3.copyObject(
        {
          Bucket: bucketName,
          CopySource,
          Key: targetKey,
        },
        (err, data) => {
          if (err) {
            reject(err)
            return
          }

          const {
            CopyObjectResult: { ETag: etag },
          } = data
          resolve({ bucket: bucketName, etag, key: targetKey })
        },
      )
    })
  }

  /**
   * Delete file in s3
   * @param {Object} params - S3 object params
   * @returns {Promise<undefined>}
   */
  async delete(params) {
    const { name, namespace } = params
    const { s3 } = this
    const Key = path.join(...[namespace, name].filter(Boolean))
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Key,
        },
        (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        },
      )
    })
  }

  /**
   * Download file from s3
   * @param {Object} params - S3 object params
   * @returns {Promise<Object>}
   */
  async download(params) {
    const { s3 } = this
    return new Promise((resolve, reject) => {
      s3.getObject(params, (err, data) => {
        if (err) {
          reject(err)
          return
        }

        resolve(data)
      })
    })
  }

  /**
   * Check an object exists or not
   * @param {Object} params - S3 object params
   * @returns {Promise<boolean>}
   */
  async exists(params) {
    const { name, namespace } = params
    const { s3 } = this
    const Key = path.join(...[namespace, name].filter(Boolean))
    try {
      await s3.headObject({ Key }).promise()
      return true
    } catch (e) {
      if (e.code === 'NotFound') {
        return false
      }

      throw e
    }
  }

  /**
   * Generate signed url to upload
   * @param {string} pathname - Path to upload
   * @param {Object} [options={}] - Optional settings
   * @returns {Promise<string>}
   */
  async generateUploadUrl(pathname, options = {}) {
    const { bucketName, s3 } = this
    const { expires = 60 * 5, type } = options
    return new Promise((resolve, reject) => {
      s3.getSignedUrl(
        'putObject',
        {
          Bucket: bucketName,
          ContentType: type,
          Expires: expires,
          Key: pathname,
        },
        (err, url) => {
          err ? reject(err) : resolve(url)
        },
      )
    })
  }

  /**
   * get metadata of file in s3
   * @param {Object} params - S3 object params
   * @returns {Promise<Object>}
   */
  async head(params) {
    const { name, namespace } = params
    const { s3 } = this
    const Key = path.join(...[namespace, name].filter(Boolean))
    return new Promise((resolve, reject) => {
      s3.headObject(
        {
          Key,
        },
        (err, data) => {
          if (err) {
            if (err.statusCode === 404) {
              return resolve(null)
            }

            reject(err)
            return
          }

          const { ContentLength: size, ContentType: type, ETag: etag } = data
          resolve({ etag, size, type })
        },
      )
    })
  }

  /**
   * Move file in s3
   * @param {Object} sourceParams - params for source file
   * @param {Object} targetParams - params for target file
   * @returns {Promise<Object>}
   */
  async move(sourceParams, targetParams) {
    const result = await this.copy(sourceParams, targetParams)
    await this.delete(sourceParams)
    return result
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
