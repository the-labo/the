'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheCaught */
const TheCaughtStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-caught-style', className)}
    styles={TheCaughtStyle.data(options)}
  />
)

TheCaughtStyle.displayName = 'TheCaughtStyle'
TheCaughtStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheCaughtStyle.defaultProps = {
  options: {},
}

TheCaughtStyle.data = () => {
  return asStyleData({
    '.the-caught': {
      background: '#FEE',
      border: '2px solid #A55',
      borderRadius: '4px',
      boxSizing: 'border-box',
      color: '#A55',
      maxWidth: '0 auto',
      padding: '16px',
      width: '100%',
    },
    '.the-caught-stack': {
      background: '#FCFCFC',
      border: '1px solid #F5F5F5',
      borderRadius: '2px',
      boxSizing: 'border-box',
      color: '#999',
      fontSize: 'small',
      maxHeight: '50vh',
      maxWidth: '100%',
      overflow: 'scroll',
      padding: '4px',
    },
  })
}

export default TheCaughtStyle
