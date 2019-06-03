'use strict'
/**
 * The is an example of Icon
 * @file example-usage.js
 */
const theIcon = require('@the-/icon')
const { Themes } = theIcon

async function tryExample() {
  const text = 'APE'
  const color = '#EA1'

  await theIcon({
    color,
    font: 'fonts/comicsans.ttf',
    text,
    theme: Themes.SQUARE,
  }).saveAs('foo/square-icon.png')
}

tryExample().catch((err) => console.error(err))
