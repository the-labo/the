'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheKeyboard */
const TheKeyboardStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-keyboard-style', className)}
    styles={TheKeyboardStyle.data(options)}
  />
)

TheKeyboardStyle.displayName = 'TheKeyboardStyle'
TheKeyboardStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheKeyboardStyle.defaultProps = {
  options: {},
}

TheKeyboardStyle.data = (options) => {
  const { borderColor = '#F0F0F0' } = options
  return asStyleData({
    '.the-keyboard': {},
    '.the-keyboard-button': {
      '&:hover': {
        background: '#F8F8F8',
        color: '#888',
      },
      '&:hover:active,&:active': {
        background: '#F0F0F0',
      },
      '&.the-keyboard-button-empty': {
        background: 'transparent',
        borderColor: 'transparent',
        pointerEvents: 'none',
      },
      alignItems: 'center',
      background: 'white',
      border: `1px solid ${borderColor}`,
      borderWidth: '1px',
      color: 'inherit',
      display: 'flex',
      flexGlow: '1',
      justifyContent: 'center',
      marginBottom: '-1px',
      marginRight: '-1px',
      minHeight: '32px',
      padding: '8px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      width: '100%',
    },
    '.the-keyboard-grid': {
      background: 'white',
      border: `1px solid ${borderColor}`,
      display: 'flex',
      flexDirection: 'column',
    },
    '.the-keyboard-row': {
      '&:first-child': {
        marginTop: '-1px',
      },
      alignItems: 'stretch',
      display: 'flex',
      justifyContent: 'flex-start',
      marginLeft: '-1px',
    },
  })
}

export default TheKeyboardStyle
