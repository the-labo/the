'use strict'

const aglob = require('aglob')
const path = require('path')
const semver = require('semver')
const { writeAsJson } = require('the-file-util')
const fixpack = require('@okunishinishi/fixpack')

function pkgSync(src, targets) {
  return async function task(ctx) {
    const { cwd, logger } = ctx
    const {
      bugs,
      engines,
      homepage,
      license,
      publishConfig,
      repository,
      version,
    } = require(path.resolve(cwd, src))
    const subPkgPaths = (await aglob(targets, { cwd })).map((filename) =>
      path.resolve(cwd, filename),
    )
    logger.trace(
      `Package inf to sync:\n` +
        JSON.stringify(
          {
            bugs,
            engines,
            homepage,
            license,
            publishConfig,
            repository,
            version,
          },
          null,
          2,
        ),
    )
    for (const subPkgPath of subPkgPaths) {
      const subPkg = require(subPkgPath)
      const needsChangeVersion = semver.gt(version, subPkg.version)
      if (!needsChangeVersion) {
        continue
      }
      logger.notice(
        `[${path.relative(process.cwd(), subPkgPath)}] Update version "${
          subPkg.version
        }" -> "${version}"`,
      )
      for (const [name, version] of Object.entries(subPkg.dependencies || {})) {
        if (/^file:\.\.\//.test(version)) {
          subPkg.dependencies[name] = '*'
        }
      }
      await writeAsJson(subPkgPath, {
        ...subPkg,
        bugs,
        engines,
        homepage,
        license,
        publishConfig,
        repository,
        version,
      })
      fixpack(subPkgPath)
    }
  }
}

module.exports = pkgSync
