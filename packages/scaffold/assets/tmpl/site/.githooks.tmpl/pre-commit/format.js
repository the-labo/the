#!/usr/bin/env node
/**
 * Format files before commit
 */
'use strict'

const pon = require('../../Ponfile.dev')
const { execSync } = require('child_process')
process.chdir(pon.cwd)

const flatten = (r = [], v) => [].concat(r, v)

void (async function () {
  const results = await pon.run('format', { disableLogging: true, throwIfEmpty: true })
  const filenames = Object.values(results).reduce(flatten, []).reduce(flatten, [])
  if (filenames.length > 0) {
    execSync(`git add ${filenames.join(' ')}`)
  }
}())
