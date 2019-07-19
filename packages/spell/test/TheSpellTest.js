/**
 * Test for TheSpell.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, equal, ok },
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

  it('maxOccurrence', async () => {
    const spell = new TheSpell({ maxOccurrence: 3 })
    ok(spell)
    const reports = await spell.checkString(`

let hogehgoeghoeh = 1
hogehgoeghoeh = 2
hogehgoeghoeh = 3
hogehgoeghoeh = 4
hogehgoeghoeh = 5
hogehgoeghoeh = 6
fugefugefugefuge = 7
    
    `)
    equal(reports.length, 1)
  })

  it('Custom plurals', async () => {
    const spell = new TheSpell({ words: ['okunishi'] })
    deepEqual(await spell.checkStringLine('This is okunishi'), [])
    deepEqual(await spell.checkStringLine('This is okunishis'), [])
  })
})

/* global describe, before, after, it */
