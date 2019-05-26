'use strict'

const path = require('path')
const { TheAzureStorage } = require('the-azure-storage')
const uuid = require('uuid')
const log = (...args) => console.log(new Date(), '[uploader]', ...args)

class PhotoUploader {
  constructor(config = {}) {
    const {
      env: {
        AZURE_CDN_HOST,
        AZURE_STORAGE_ACCESS_KEY,
        AZURE_STORAGE_ACCOUNT,
        AZURE_STORAGE_CONTAINER,
        MAPPER_APP_PROCESS_NAME,
      },
    } = process
    this.accountName = AZURE_STORAGE_ACCOUNT
    this.accountKey = AZURE_STORAGE_ACCESS_KEY
    this.containerName = AZURE_STORAGE_CONTAINER
    this.cdnHost = AZURE_CDN_HOST
    this.appProcessName = MAPPER_APP_PROCESS_NAME
  }

  async upload(filename) {
    const storage = new TheAzureStorage(this.accountName, this.accountKey)
    const extname = path.extname(filename)
    const blobName = `${this.appProcessName.replace(
      /\\./g,
      '-',
    )}/photo-${uuid.v4()}${extname}`
    const { url } = await storage.upload(filename, {
      as: blobName,
      cdn: this.cdnHost,
      container: this.containerName,
    })

    log('Upload', { url })
    return url
  }
}

module.exports = PhotoUploader
