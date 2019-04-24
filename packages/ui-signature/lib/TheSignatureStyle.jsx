'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheSignature */
const TheSignatureStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-signature-style', className)}
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
  return asStyleData({
    '.the-signature': {
      display: 'block',
      position: 'relative',
    },
    '.the-signature-canvas': {
      background: 'white',
      border: '1px solid #555',
      cursor: 'pointer',
      display: 'block',
    },
  })
}

export default TheSignatureStyle
