'use strict'
const { resolveUrl } = require('@the-/util-site')

async function tryExample() {
  const url = resolveUrl('/foo/bar/:id', { id: 1 })
  console.log(url)
}

tryExample().catch((err) => console.error(err))
