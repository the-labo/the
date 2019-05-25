'use strict'
const { TheRefactor } = require('@the-/refactor')

async function tryExample() {
  const refactor = new TheRefactor()

  // Example to rename "src/controllers/foo.js" into "src/serverside/fooCtrl.mjs"
  await refactor.rename('src/controllers/*.js', ({ basename }) => ({
    basename: /Ctrl$/.match(basename) ? basename : `${basename}Ctrl`,
    dirname: 'src/serverside',
    extname: '.mjs',
  }))
}

tryExample().catch((err) => console.error(err))
