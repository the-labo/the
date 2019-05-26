'use strict'
/**
 * Test for TheVideoConverter.
 * Runs with mocha.
 */
const { copyAsync } = require('asfs')
const {
  strict: { equal, ok },
} = require('assert')
const TheVideoConverter = require('../lib/TheVideoConverter')

describe('the-video-converter', async function() {
  this.timeout(120 * 1000)
  before(() => {})

  after(() => {})

  it('inspect', async () => {
    const converter = new TheVideoConverter()
    const info = await converter.inspect(
      `${__dirname}/../misc/mocks/mock-01.webm`,
    )
    equal(info.streams[0].codec_name, 'vp8')
  })
  it('Convert into MP4', async () => {
    ok(TheVideoConverter)
    const converter = new TheVideoConverter()
    await converter.convertIntoMP4(
      `${__dirname}/../misc/mocks/mock-01.webm`,
      `${__dirname}/../tmp/testing-mp4/01.mp4`,
    )
  })

  it('Process file', async () => {
    await copyAsync(
      `${__dirname}/../misc/mocks/mock-01.webm`,
      `${__dirname}/../tmp/testing-process/01.webm`,
    )
    const converter = new TheVideoConverter()
    const converted = await converter.process(
      `${__dirname}/../tmp/testing-process/01.webm`,
      { cleanup: true },
    )
    ok(converted)
    ok(!(await converter._needsToProcess(converted)))
  })

  it('Process file 3', async () => {
    await copyAsync(
      `${__dirname}/../misc/mocks/mock-01.mp4`,
      `${__dirname}/../tmp/testing-process/01.mp4`,
    )
    const converter = new TheVideoConverter()
    await converter.process(`${__dirname}/../tmp/testing-process/01.mp4`, {
      cleanup: true,
    })
  })
})

/* global describe, before, after, it */
