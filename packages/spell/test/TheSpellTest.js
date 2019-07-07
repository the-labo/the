/**
 * Test for TheSpell.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const TheSpell = require('../lib/TheSpell')

describe('the-spell', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const spell = new TheSpell()
    ok(spell)
    await spell.checkFile(__filename)
  })

  it('Check content', async () => {
    const spell = new TheSpell({
      words: ['hogehogeho'],
    })
    const reports = await spell.checkString(`
const x = "rrr "
let fxx = 1
let a = 2
const n = "instanceof"
const n2 = "instance"
const n3 = "instant"
const hogehogeho = "instant"
const n4 = doSomethingFunny()
    `)
    equal(reports[1].word, 'fxx')
    equal(reports.length, 2)
  })
})

/* global describe, before, after, it */
