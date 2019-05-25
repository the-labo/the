'use strict'
const aglob = require('aglob')
const installIfNeeded = require('npm-install-if-needed')
const path = require('path')

function pkgInstall(targets) {
  return async function task(ctx) {
    const { cwd, logger } = ctx
    const subPkgPaths = (await aglob(targets, { cwd })).map((filename) =>
      path.resolve(cwd, filename),
    )
    for (const subPkgPath of subPkgPaths) {
      const subPkgDir = path.dirname(subPkgPath)
      logger.notice(
        `[${path.relative(process.cwd(), subPkgDir)}] Installing...`,
      )
      const installed = await installIfNeeded({ cwd: subPkgDir })
      if (installed) {
        logger.debug('...installing finished')
      } else {
        logger.debug('...installing skipped (no need to install)')
      }
    }
  }
}

module.exports = pkgInstall
