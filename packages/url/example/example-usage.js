'use strict'

const { formatUrl } = require('@the-/url')

async function tryExample() {
  let url = formatUrl('/foo/:id', { id: 2 })
  console.log(url) // "/foo/2"
}

tryExample().catch((err) => console.error(err))
