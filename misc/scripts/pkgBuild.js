#!/usr/bin/env node
/**
 * @file Build package
 */

'use strict'

const build = require('@the-/script-build')

const [, , ...args] = process.argv

build({
  noshim: args.includes('--noshim'),
})
