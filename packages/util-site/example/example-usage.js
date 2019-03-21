'use strict'

const { resolveUrl } = require('@the-/util-site')

async function tryExample() {
  const url = resolveUrl('/foo/bar/:id', {
    id: 1,
  })
}

tryExample().catch((err) => console.error(err))
