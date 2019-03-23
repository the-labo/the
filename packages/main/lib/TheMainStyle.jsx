'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-component'
import { TheStyle } from '@the-/style'

/** Style for TheMain */
const TheMainStyle = ({className, id, options}) => (
  <TheStyle {...{id}}
            className={classnames('the-main-style', className)}
            styles={TheMainStyle.data(options)}
  />
)

TheMainStyle.displayName = 'TheMainStyle'
TheMainStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheMainStyle.defaultProps = {
  options: {},
}

TheMainStyle.data = (options) => {
  const {ThemeValues} = TheStyle
  const {
    dominantColor = ThemeValues.dominantColor,
  } = options
  return asStyleData('.the-main', {
    '.the-main-spin.the-spinner-cover': {
      background: 'rgba(255,255,255,0.98)',
      zIndex: 999,
    },
    '&': {
      flexGrow: 1,
      height: '100%',
      width: '100%',
    },
  })
}

export default TheMainStyle
