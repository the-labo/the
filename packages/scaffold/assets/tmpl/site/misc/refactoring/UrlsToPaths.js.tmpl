#!/usr/bin/env node
'use strict'

process.chdir(`${__dirname}/../..`)

const { TheRefactor } = require('@the-/refactor')

async function main() {
  await new TheRefactor().process(
    [
      '+(assets|server|client|conf)/**/*.js',
      '+(assets|server|client|conf)/**/*.jsx',
      '+(assets|server|client|conf)/**/.*.bud',
      'misc/lint/*.json',
      '*.js',
    ],
    'Urls',
    'Paths',
  )

  const Paths = require('../../conf/Paths')

  const keys = Object.keys(Paths).map((key) => key.replace(/_PATH$/, '_URL'))
  for (const key of keys) {
    await new TheRefactor().process(
      [
        '+(assets|server|client|conf)/**/*.js',
        '+(assets|server|client|conf)/**/*.jsx',
        '+(assets|server|client|conf)/**/.*.bud',
        '*.js',
      ],
      key,
      key.replace(/_URL$/, '_PATH'),
    )
  }
}

void main().catch((e) => {
  console.error(e)
  process.exit(1)
})
