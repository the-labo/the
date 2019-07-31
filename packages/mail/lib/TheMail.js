'use strict'

/**
 * @memberof module:@the-/mail
 * @class TheMail
 */
const { clone } = require('asobj')
const { unlessProduction } = require('@the-/check')
const { toLowerKeys } = require('./helpers')
const { sendMock, sendSendgrid, sendSMTP } = require('./sending')

/** @lends module:@the-/mail.TheMail */
class TheMail {
  constructor(config = {}) {
    const env = toLowerKeys(config.env || clone(config, { without: 'name' }))
    this._env = env
  }

  get env() {
    return this._env
  }

  /**
   * Send mail
   * @param {Object} config
   * @param {string} config.from - From address
   * @param {string} config.to - To address
   * @param {string} config.subject - Mail subject
   * @param {string} config.content - Mail content
   * @returns {Promise}
   */
  async send(config) {
    const { env } = this
    unlessProduction(() => {
      const requiredKeys = ['from', 'to']
      for (const key of requiredKeys) {
        if (!config[key]) {
          throw new Error(`[TheMail] config.${key} is required`)
        }
      }
    })
    const { content, from, subject, to } = config
    const service = String(env.service || 'mock')
      .toLowerCase()
      .trim()

    switch (service) {
      case 'mock': {
        return sendMock({
          content,
          from,
          subject,
          to,
        })
      }
      case 'sendgrid': {
        return sendSendgrid({
          content,
          from,
          key: env.key,
          subject,
          to,
        })
      }
      case 'smtp': {
        return sendSMTP({
          content,
          from,
          subject,
          to,
          url: env.url,
        })
      }
      default:
        throw new Error(`[TheMail] Unknown service: ${env.service}`)
    }
  }
}

module.exports = TheMail
