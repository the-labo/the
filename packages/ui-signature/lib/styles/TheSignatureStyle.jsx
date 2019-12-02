'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheSignature */
const TheSignatureStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-signature-style', className)}
    id={id}
    styles={TheSignatureStyle.data(options)}
  />
)

TheSignatureStyle.displayName = 'TheSignatureStyle'
TheSignatureStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheSignatureStyle.defaultProps = {
  options: {},
}

TheSignatureStyle.data = () => {
  const { errorColor } = ThemeValues
  return asStyleData({
    '.the-signature': {
      '&.the-signature-error': {
        '.the-signature-canvas': {
          borderColor: errorColor,
        },
      },
      display: 'block',
      position: 'relative',
    },
    '.the-signature-canvas': {
      background: 'white',
      border: '1px solid #555',
      cursor: 'pointer',
      display: 'block',
    },
    '.the-signature-error-message': {
      color: errorColor,
      fontSize: 'small',
    },
  })
}

export default TheSignatureStyle
