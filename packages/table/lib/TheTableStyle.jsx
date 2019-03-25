'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-component'
import { TheStyle } from '@the-/style'

/** Style for TheTable */
const TheTableStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-table-style', className)}
    styles={TheTableStyle.data(options)}
  />
)

TheTableStyle.displayName = 'TheTableStyle'
TheTableStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheTableStyle.defaultProps = {
  options: {},
}

TheTableStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    dominantColor = ThemeValues.dominantColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightTextColor = ThemeValues.lightTextColor,
  } = options
  return asStyleData({
    '.the-table': {
      borderCollapse: 'collapse',
      margin: '16px auto',
      width: '100%',
    },
    '.the-table-alt-cell': {
      textAlign: 'center',
    },
    '.the-table-cell': {
      border: `1px solid ${lightBorderColor}`,
      padding: '4px 8px',
    },
    '.the-table-checkbox': {
      '.the-input-checkbox': {
        '.the-input-checkbox-item': {
          boxSizing: 'border-box',
          justifyContent: 'center',
          margin: 0,
          width: '100%',
        },
        alignItems: 'center',
        display: 'inline-flex',
        height: '24px',
        justifyContent: 'center',
        margin: '0 auto',
        width: '100%',
      },
      '.the-input-checkbox-label': {
        alignItems: 'center',
        display: 'inline-flex',
        height: '100%',
        justifyContent: 'center',
        padding: '4px 0',
        width: '100%',
      },
      margin: 0,
      padding: 0,
    },
    '.the-table-checkbox-cell': {
      padding: '0 !important',
      textAlign: 'center',
      width: '48px',
    },
    '.the-table-header-cell': {
      border: `1px solid ${lightBorderColor}`,
      padding: '4px 8px',
      whiteSpace: 'nowrap',
    },
    '.the-table-row-selected': {
      border: `2px solid ${dominantColor}`,
    },
    '.the-table-sortable-header-cell': {
      '.the-icon': {
        marginRight: '2px',
      },
      a: {
        '&:active': {
          opacity: 0.9,
        },
        alignItems: 'center',
        cursor: 'pointer',
        display: 'inline-flex',
        justifyContent: 'center',
        padding: '4px 8px',
      },
    },
    '.the-table.the-table-empty': {
      color: lightTextColor,
      display: 'block',
      padding: '24px 0',
      textAlign: 'center',
    },
    '.the-table.the-table-wide': {
      width: '100%',
    },
  })
}

export default TheTableStyle
