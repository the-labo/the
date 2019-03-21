'use strict'

const aglob = require('aglob')
const path = require('path')
const {
  command: { spawn },
} = require('pon-task-basic')

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
      await spawn('npm', ['install'], { cwd: subPkgDir })(ctx)
    }
  }
}

module.exports = pkgInstall
