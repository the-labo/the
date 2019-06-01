'use strict'
/**
 * Test for Icon.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const TheIcon = require('../lib/TheIcon')
const Themes = require('../lib/Themes')

describe('icon', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheIcon)

    const icon = new TheIcon({
      height: 126,
      width: 126,
    })

    const color = '#EA1'
    const borderRadius = 8
    icon.setBackground({ borderRadius, color: 'white' })
    icon.setBorder({ borderRadius, color, width: 4 })
    icon.setText('APE', { color })

    await icon.saveAs(`${__dirname}/../tmp/testing-icon01.png`)
  })

  it('With themes', async () => {
    const dir = `${__dirname}/../tmp/themes`
    const text = 'APE'
    const color = '#A11'
    const font = `${__dirname}/../misc/mocks/fonts/Raleway/Raleway-Thin.ttf`
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.SQUARE,
    }).saveAs(`${dir}/square.png`)
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.SQUARE_FILL,
    }).saveAs(`${dir}/square-fill.png`)
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.ROUND,
    }).saveAs(`${dir}/round.png`)
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.ROUND_FILL,
    }).saveAs(`${dir}/round-fill.png`)
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.CIRCLE,
    }).saveAs(`${dir}/circle.png`)
    await new TheIcon({
      color,
      font,
      text,
      theme: Themes.CIRCLE_FILL,
    }).saveAs(`${dir}/circle-fill.png`)
  })
})

/* global describe, before, after, it */
