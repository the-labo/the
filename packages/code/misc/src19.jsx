'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-component'

/** Style for TheFooter */
const TheFooterStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-footer-style', className)}
    styles={TheFooterStyle.data(options)}
  />
)

TheFooterStyle.displayName = 'TheFooterStyle'
TheFooterStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheFooterStyle.defaultProps = {
  options: {},
}

TheFooterStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    lightBorderColor = ThemeValues.lightBorderColor,
    lightLinkColor = ThemeValues.lightLinkColor,
  } = options
  return asStyleData('.the-footer', {
    '.the-footer-copyright': {
      display: 'inline-block',
      opacity: 0.33,
      padding: '0 8px',
    },
    '.the-footer-inner': {
      alignItems: 'center',
      borderTop: `1px solid ${lightBorderColor}`,
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: 'smaller',
      justifyContent: 'space-between',
      padding: '32px 0',
    },
    '.the-footer-link': {
      color: lightLinkColor,
      padding: '0 8px',
      textDecoration: 'none',
    },
    '.the-footer-links': {
      display: 'flex',
    },
    '.the-footer-row': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: 'smaller',
      justifyContent: 'space-between',
      margin: '8px 0',
    },
    '': {},
  })
}

export default TheFooterStyle
