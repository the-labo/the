const aglob = require('aglob')
const { ok } = require('assert').strict

describe('packages', function () {
  const PACKAGES_PATTERN = `${__dirname}/../packages/*/package.json`

  it('Assert deps', async () => {
    const pkgFiles = await aglob(PACKAGES_PATTERN)
    for (const pkgFile of pkgFiles) {
      const pkg = require(pkgFile)

      for (const [, version] of Object.entries(pkg.dependencies || {})) {
        ok(
          !/^file:/.test(version),
          `[${pkg.name}] Should not start with "file:"`,
        )
      }
    }
  })
})

/* global describe, it */
