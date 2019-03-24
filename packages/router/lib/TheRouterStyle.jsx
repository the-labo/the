'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/style'

/** Style for TheRouter */
const TheRouterStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-html-style', className)}
    styles={TheRouterStyle.data(options)}
  />
)

TheRouterStyle.displayName = 'TheRouterStyle'
TheRouterStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheRouterStyle.defaultProps = {
  options: {},
}

TheRouterStyle.data = (options) => {
  const { height = '100%' } = options
  return {
    '.the-router': {
      height: 'inherit',
    },
    '.the-router-hash': {
      height,
    },
    '.the-router-static': {
      height,
    },
  }
}

export default TheRouterStyle
