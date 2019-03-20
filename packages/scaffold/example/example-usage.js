#!/usr/bin/env node

'use strict'

const theScaffold = require('@the-/scaffold')

// Generate module project
theScaffold(
  'component', // Type
  'my-projects/my-custom-component', // Destination directory
  {
    force: false,
  },
)
  .then(() => console.log('done!'))
  .catch((err) => console.error(err))
