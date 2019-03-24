'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-component'
import { TheStyle } from '@the-/style'

/** Style for ThePager */
const ThePagerStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-pager-style', className)}
    styles={ThePagerStyle.data(options)}
  />
)

ThePagerStyle.displayName = 'ThePagerStyle'
ThePagerStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

ThePagerStyle.defaultProps = {
  options: {},
}

ThePagerStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  let {
    backgroundColor = ThemeValues.backgroundColor,
    dominantColor = ThemeValues.dominantColor,
    size = 24,
  } = options
  return Object.assign(
    {},
    ...[
      asStyleData({
        '.the-pager': {
          whiteSpace: 'nowrap',
        },
        '.the-pager-counts': {
          fontSize: 'small',
          margin: '8px 0',
          whiteSpace: 'nowrap',
        },
        '.the-pager-counts-symbol': {
          display: 'inline-block',
          margin: '0 2px',
        },
        '.the-pager-item': {
          background: `${backgroundColor}`,
          border: `1px solid ${dominantColor}`,
          color: `${dominantColor}`,
          display: 'inline-block',
          fontSize: '14px',
          marginRight: '-1px',
          textAlign: 'center',
          userSelect: 'none',
        },
        '.the-pager-item-inner': {
          display: 'inline-block',
          height: `${size}px`,
          lineHeight: `${size}px`,
          padding: '4px',
          userSelect: 'none',
          width: `${size}px`,
        },
        '.the-pager-item:active': {
          opacity: 0.9,
        },
        '.the-pager-item:hover': {
          cursor: 'pointer',
          opacity: 0.8,
          textDecoration: 'underline',
        },
        '.the-pager-item.the-pager-item-disabled': {
          color: 'gray',
          cursor: 'default',
          opacity: 0.5,
        },
        '.the-pager-item.the-pager-item-selected, .the-pager-item.the-pager-item-selected:hover, .the-pager-item.the-pager-item-selected:active': {
          background: `${dominantColor}`,
          color: 'white',
          cursor: 'default',
          opacity: 1,
        },
        '.the-pager-row': {
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '8px 0',
          padding: '0 8px',
        },
      }),
    ],
  )
}

export default ThePagerStyle
