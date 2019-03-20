'use strict'

const aglob = require('aglob')
const path = require('path')
const {
  command: { spawn },
} = require('pon-task-basic')

function pkgRun(targets, command) {
  return async function task(ctx) {
    const { cwd, logger } = ctx
    const subPkgPaths = (await aglob(targets, { cwd })).map((filename) =>
      path.resolve(cwd, filename),
    )
    for (const subPkgPath of subPkgPaths) {
      const subPkg = require(subPkgPath)
      const subPkgDir = path.dirname(subPkgPath)
      let hasCommand = command in (subPkg.scripts || {})
      if (!hasCommand) {
        continue
      }
      logger.notice(
        `[${path.relative(process.cwd(), subPkgDir)}] Run ${command} script...`,
      )
      await spawn('npm', ['run', command], { cwd: subPkgDir })(ctx)
    }
  }
}

module.exports = pkgRun
