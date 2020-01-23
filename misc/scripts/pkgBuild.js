#!/usr/bin/env node
/**
 * @file Build package
 */
'use strict'

const build = require('@the-/script-build')

const {
  argv: [, , ...args],
} = process

build({
  noshim: args.includes('--noshim'),
})
