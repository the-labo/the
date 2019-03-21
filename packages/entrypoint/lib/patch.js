/**
 * Apply patch
 * @function patch
 */
'use strict'

const { isFirefox, isiOS, unlessProduction } = require('the-check')
const { get } = require('the-window')
const createStyleElement = require('./helpers/createStyleElement')

/** @lends patch */
function patch() {
  if (isFirefox()) {
    patch.firefox()
  }
  if (isiOS()) {
    patch.ios()
  }
}

Object.assign(patch, {
  _injectStyle(css, { className } = {}) {
    const document = get('document')
    const style = createStyleElement(css.trim(), { className })
    document.head.appendChild(style)
  },
  firefox() {
    patch._injectStyle(
      `
.the-input-tag.the-input-tag-focused {
  outline-width: 1px;
  outline-offset: -1px;
}
    `,
      {
        className: 'the-entrypoint-firefox-patch',
      },
    )
    unlessProduction(() => {
      console.log(`[TheEntrypoint] firefox patch apply`)
    })
  },
  ios() {
    patch._injectStyle(
      `
input[type='text'],
input[type='number'],
input[type='password'],
input[type='search'],
input[type='tel'],
textarea {
  font-size: 16px;
  line-height: normal;
}
      `,
      {
        className: 'the-entrypoint-ios-patch',
      },
    )
    unlessProduction(() => {
      console.log(`[TheEntrypoint] iOS patch apply`)
    })
  },
})

module.exports = patch
