'use strict'

const { resolveUrl } = require('the-site-util')

async function tryExample() {
  const url = resolveUrl('/foo/bar/:id', {
    id: 1,
  })
}

tryExample().catch((err) => console.error(err))
