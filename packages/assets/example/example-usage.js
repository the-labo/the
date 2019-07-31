'use strict'

const theAssets = require('@the-/assets')

async function tryExample() {
  const assets = theAssets()
  await assets.installTo('public/css')
}

tryExample().catch((err) => console.error(err))
