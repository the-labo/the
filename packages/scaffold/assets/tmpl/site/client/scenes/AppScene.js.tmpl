/**
 * AppScene
 * @class AppScene
 */
'use strict'

const { bindScope, withBusy, withHistory, withLocation, withQuery } = require('the-scene-mixins/shim')
const { Urls } = require('@self/conf')
const Scene = require('./abstract/Scene')

@withBusy
@withQuery
@withHistory
@withLocation
@bindScope('app')
class AppSceneBase extends Scene {}

/** @lends AppScene */
class AppScene extends AppSceneBase {
  handleLocationChange (location) {
    setTimeout(() => {
      this.setLocation(location)
    }, 1) // Wait to router change
  }

  handleRejectionReason (reason) {
    const href = {
      'ForbiddenError': Urls.ERROR_FORBIDDEN_URL,
      'NotFoundError': Urls.ERROR_NOTFOUND_URL,
    }[reason?.name]
    if (href) {
      this.changeLocationTo(href)
      return true
    }
    return false
  }

  setLocation ({ pathname, search }) {
    this.set({
      pathname,
      query: this.queryWithSearch(search),
    })
  }

  @withBusy.while
  async doExec () {
    await this.reloadLocation()
  }
}

module.exports = AppScene
