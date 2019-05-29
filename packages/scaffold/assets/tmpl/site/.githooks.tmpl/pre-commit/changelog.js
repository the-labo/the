#!/usr/bin/env node
/**
 * Generate changelog files before commit
 */
'use strict'

const pon = require('../../Ponfile.dev')
process.chdir(pon.cwd)

void (async function () {
  await pon.run('git:changelog', {disableLogging: true, throwIfEmpty: true})
}())
