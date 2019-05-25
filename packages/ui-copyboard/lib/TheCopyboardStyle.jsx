'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheCopyboard */
const TheCopyboardStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-copyboard-style', className)}
    id={id}
    styles={TheCopyboardStyle.data(options)}
  />
)

TheCopyboardStyle.displayName = 'TheCopyboardStyle'
TheCopyboardStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheCopyboardStyle.defaultProps = {
  options: {},
}

TheCopyboardStyle.data = (options) => {
  const { tipBackgroundColor = '#333' } = options
  return asStyleData({
    '.the-copyboard': {
      display: 'inline-block',
      position: 'relative',
    },
    '.the-copyboard-anchor': {
      background: '#FAFAFA',
      border: '1px solid #F0F0F0',
      color: '#555',
      display: 'block',
      fontSize: 'smaller',
      overflowX: 'auto',
      padding: '16px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
    '.the-copyboard-tip': {
      backgroundColor: tipBackgroundColor,
      borderRadius: '4px',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.33)',
      color: 'white',
      display: 'block',
      fontSize: 'x-small',
      fontStyle: 'italic',
      padding: '0.5em 1em',
      position: 'absolute',
      right: 0,
      top: '-1em',
      whiteSpace: 'nowrap',
    },
    '.the-copyboard-tip-square': {
      background: tipBackgroundColor,
      bottom: '-4px',
      color: tipBackgroundColor,
      display: 'inline-block',
      height: '8px',
      left: '12px',
      position: 'absolute',
      transform: 'rotate(45deg)',
      width: '8px',
    },
  })
}

export default TheCopyboardStyle
