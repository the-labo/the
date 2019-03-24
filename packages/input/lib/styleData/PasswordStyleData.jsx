'use strict'

import { asStyleData } from '@the-/util-component'

function PasswordStyleData({ ToggleIconStyle }) {
  return asStyleData({
    '.the-input-password': {
      fontFamily: [
        '"SFMono-Regular"',
        '"Consolas"',
        '"Liberation Mono"',
        '"Menlo"',
        '"Courier"',
        '"Courier New"',
        '"Tahoma"',
        '"Verdana"',
      ].join(', '),
      position: 'relative',
    },
    '.the-input-password-toggle': ToggleIconStyle({
      color: 'inherit',
      margin: '0 8px',
      textDecoration: 'none',
    }),
  })
}

export default PasswordStyleData
