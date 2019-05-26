'use strict'
/**
 * Test for TheRefactor.
 * Runs with mocha.
 */
const { mkdirpAsync, statAsync, writeFileAsync } = require('asfs')
const {
  strict: { ok },
} = require('assert')
const path = require('path')
const TheRefactor = require('../lib/TheRefactor')

describe('the-refactor', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const filename = `${__dirname}/../tmp/hoge/hoge/sample01.js`
    const dirname = path.dirname(filename)
    await mkdirpAsync(dirname)
    await writeFileAsync(filename, 'message = This is sample01')

    ok(TheRefactor)

    const { rename, renameDir, rewrite, scatter } = new TheRefactor()
    await rename(filename, ({ basename }) => ({
      basename: `${basename}Great`,
      extname: '.great',
    }))

    ok(await statAsync(`${__dirname}/../tmp/hoge/hoge/sample01Great.great`))
    await rewrite(`${dirname}/*.great`, {
      [/(Thi)(.)/]: ($0, $1, $2) => $1 + $2.toUpperCase(),
      sample01: 'hoge01',
    })

    await renameDir(
      `${__dirname}/../tmp/hoge/hoge`,
      `${__dirname}/../tmp/hoge/hoge2`,
    )

    await scatter(__filename, [`${__dirname}/../tmp/foo`])
  })
})

/* global describe, before, after, it */
