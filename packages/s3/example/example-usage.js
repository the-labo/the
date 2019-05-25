'use strict'
const { TheS3 } = require('@the-/s3')

async function tryExample() {
  const s3 = new TheS3({
    accessKeyId: 'xxxxx',
    bucket: 'myBucket01',
    region: 'ap-northeast-1',
    secretAccessKey: 'xxxxxxxxx',
    signatureVersion: 'v4',
  })

  await s3('some-text.txt', {})
}

tryExample().catch((err) => console.error(err))
