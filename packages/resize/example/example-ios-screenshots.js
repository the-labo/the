#!/usr/bin/env

'use strict'

const theResize = require('@the-/resize')

async function main() {
  // https://help.apple.com/app-store-connect/#/devd274dd925
  const iosScreenShotSizes = {
    iPadPortrait: { height: 2732, width: 2048 },
    iPhonePortrait: { height: 2208, width: 1242 },
  }
  for (const [name, { height, width }] of Object.entries(iosScreenShotSizes)) {
    const resizer = theResize({
      enlarge: true,
      fit: 'contain',
      height,
      width,
    })
    console.log(`[Screenshot] resizing ${name}...`)
    await resizer.convert('./screenshots/src', './screenshots/dist')
  }
}

main().catch((e) => {
  console.error(e)
})
