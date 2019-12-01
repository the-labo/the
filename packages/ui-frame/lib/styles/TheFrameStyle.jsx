'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheFrame */
const TheFrameStyle = ({ className, id, options }) => (
  <TheStyle
    className={c('the-frame-style', className)}
    id={id}
    styles={TheFrameStyle.data(options)}
  />
)

TheFrameStyle.displayName = 'TheFrameStyle'
TheFrameStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheFrameStyle.defaultProps = {
  options: {},
}

TheFrameStyle.data = () =>
  asStyleData('.the-frame', {
    '.the-frame-embed-content': {
      height: 'fit-content',
    },
    '.the-frame-iframe': {
      border: 'none',
      display: 'block',
      width: '100%',
    },
    '&': {
      display: 'block',
      position: 'relative',
    },
  })

export default TheFrameStyle
