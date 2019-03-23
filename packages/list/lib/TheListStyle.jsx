'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-component'
import { TheStyle } from '@the-/style'

/** Style for TheList */
const TheListStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={classnames('the-list-style', className)}
    styles={TheListStyle.data(options)}
  />
)

TheListStyle.displayName = 'TheListStyle'
TheListStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheListStyle.defaultProps = {
  options: {},
}

TheListStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const {
    backgroundColor = ThemeValues.backgroundColor,
    contentPadding = ThemeValues.contentPadding,
    contentWidth = ThemeValues.contentWidth,
    lightBackgroundColor = ThemeValues.lightBackgroundColor,
    lightBorderColor = ThemeValues.lightBorderColor,
    lightLinkColor = ThemeValues.lightLinkColor,
    lightTextColor = ThemeValues.lightTextColor,
    tappableHeight = ThemeValues.tappableHeight,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-list': {
        backgroundColor,
        margin: 0,
        padding: 0,
        position: 'relative',
      },
      '.the-list-alt': {
        color: '#CCC',
        display: 'block',
        fontSize: '1.33em',
        listStyle: 'none',
        padding: '32px 8px',
        textAlign: 'center',
        width: '100%',
      },
      '.the-list-item': {
        '&.the-list-item-borderless': {
          border: 'none',
        },
        borderBottom: `1px solid ${lightBorderColor}`,
        listStyle: 'none',
        margin: 0,
        minHeight: tappableHeight,
        padding: 0,
      },
      '.the-list-item-col': {
        '&.the-list-item-col-wide': {
          width: '100%',
        },
        alignItems: 'flex-start',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: tappableHeight,
      },
      '.the-list-item-image': {
        marginRight: '8px',
      },
      '.the-list-item-inner': {
        '&:active': {},
        '&:hover': {},
        alignItems: 'center',
        boxSizing: 'border-box',
        color: lightLinkColor,
        display: 'flex',
        justifyContent: 'flex-start',
        margin: 0,
        maxWidth: '100%',
        padding: `${contentPadding}px ${contentPadding * 2}px`,
        textDecoration: 'none',
      },
      '.the-list-item-sub-title': {
        color: lightTextColor,
        fontSize: 'small',
        margin: 0,
        padding: '0 4px',
      },
      '.the-list-item-title': {
        fontWeight: 'normal',
        margin: 0,
        padding: '0 4px',
      },
      '.the-list.the-list-horizontal': {
        '.the-list-item': {
          '.the-list-item-inner': {
            border: `1px solid ${lightBorderColor}`,
            flexDirection: 'column',
            margin: '8px',
            padding: '8px',
          },
          '&.the-list-item-borderless': {
            '.the-list-item-inner': {
              border: 'none',
            },
          },
          border: 'none',
          display: 'block',
          flexShrink: 0,
          margin: 0,
          maxWidth: '100%',
          overflow: 'hidden',
          width: 'auto',
        },
        alignItems: 'flex-start',
        display: 'flex',
        margin: '0',
        overflow: 'auto',
        padding: '8px 4px',
      },
    }),
    asStyleData({
      '.the-list-group': {
        display: 'block',
        margin: '8px 0',
      },
      '.the-list-group-body': {},
      '.the-list-group-header': {
        backgroundColor: lightBackgroundColor,
        borderBottom: `1px solid ${lightBorderColor}`,
        color: lightTextColor,
        fontSize: 'smaller',
        fontWeight: 'normal',
        margin: 0,
        padding: '0 8px',
      },
    }),
  )
}

export default TheListStyle
