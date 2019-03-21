/**
 * Test for TheResize.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const TheResize = require('../lib/TheResize')

describe('the-resize', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheResize)

    const resize = new TheResize({
      height: 10,
      width: 20,
    })

    const converted = await resize.convert(
      `${__dirname}/../misc/mocks/test.png`,
      `${__dirname}/../tmp/testing/test-01.png`,
    )
    ok(converted.changed)

    {
      const converted2 = await resize.convert(
        `${__dirname}/../tmp/testing/test-01.png`,
        `${__dirname}/../tmp/testing/test-02.png`,
      )
      ok(!converted2.changed)
    }
    {
      ok(
        await new TheResize({ width: 500 }).isSupported(
          `${__dirname}/../tmp/testing/test-02.png`,
        ),
      )
    }
    {
      await new TheResize({ width: 500 }).overwrite(
        `${__dirname}/../tmp/testing/test-02.png`,
      )
    }

    equal(
      await new TheResize({ width: 0 }).overwriteIfPossible('hoge.mov', {
        safely: true,
      }),
      null,
    )
  })

  it('Rotate', async () => {
    const resize = new TheResize({
      height: 500,
      width: 500,
    })

    const converted2 = await resize.convert(
      `${__dirname}/../misc/mocks/test2.jpg`,
      `${__dirname}/../tmp/testing/test2-01.png`,
    )
    ok(converted2.changed)
  })
})

/* global describe, before, after, it */
