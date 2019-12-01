'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheMain */
const TheMainStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-main-style', className)}
    id={id}
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

TheMainStyle.data = () =>
  asStyleData('.the-main', {
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

export default TheMainStyle
