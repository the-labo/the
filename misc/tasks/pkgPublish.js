'use strict'

const aglob = require('aglob')
const path = require('path')
const publishIfNeeded = require('publish-if-needed')

function pkgPublish(targets) {
  return async function task(ctx) {
    const { cwd, logger } = ctx
    for (const pkgFile of await aglob(targets, { cwd })) {
      const pkg = require(path.resolve(cwd, pkgFile))

      const dirname = path.dirname(pkgFile)
      process.chdir(path.resolve(cwd, dirname))
      logger.debug('Publishing', [pkg.name, pkg.version].join('@'))
      await publishIfNeeded()
    }
  }
}

module.exports = pkgPublish
