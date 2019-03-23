'use strict'

const theTmp = require('@the-/tmp')

async function tryExample() {
  // Create tmp file and clean up automatically
  await theTmp.while(async (filename) => {
    console.log('Generated file', filename)
  })

  // Manually cleanup
  {
    const { cleanup, filename } = await theTmp.generate()
    console.log('Generated file', filename)
    cleanup() // Cleanup the file
  }
}

tryExample().catch((err) => console.error(err))
