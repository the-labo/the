'use strict'
/**
 * @class TheFacebook
 */
const abind = require('abind')
const arequest = require('arequest')
const qs = require('qs')

/** @lends TheFacebook */
class TheFacebook {
  constructor(options = {}) {
    const { apiVersion = 'v2.11' } = options

    this.apiVersion = apiVersion
    abind(this)
  }

  userImageUrlFor(fbUserId, options = {}) {
    const { height = 256, width = 256 } = options
    return this._apiUrlFor(`/${fbUserId}/picture`, {
      height,
      width,
    })
  }

  async api(path, params) {
    const url = this._apiUrlFor(path, params)
    const { body, statusCode } = await arequest({
      json: true,
      method: 'GET',
      url,
    })
    if (statusCode !== 200) {
      throw new Error(`Facebook request failed: ${JSON.stringify(body)}`)
    }
    return body
  }

  async appTokenFor(appId, appSecret) {
    const { access_token: appToken } = await this.api('/oauth/access_token', {
      client_id: appId,
      client_secret: appSecret,
      grant_type: 'client_credentials',
    })
    return appToken
  }

  async userDataFor(token, appToken, options = {}) {
    const { fields = 'name,email,picture' } = options
    const {
      data: { user_id: fbUserId },
    } = await this.api('/debug_token', {
      access_token: appToken,
      input_token: token,
    })
    return this.api(`/${fbUserId}`, {
      access_token: token,
      fields,
    })
  }

  _apiUrlFor(path, params) {
    const { apiVersion } = this
    const query = qs.stringify(params)
    return `https://graph.facebook.com/${apiVersion}${path}?${query}`
  }
}

module.exports = TheFacebook
