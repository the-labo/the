'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheStep */
const TheStepStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-step-style', className)}
    styles={TheStepStyle.data(options)}
  />
)

TheStepStyle.displayName = 'TheStepStyle'
TheStepStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheStepStyle.defaultProps = {
  options: {},
}

TheStepStyle.data = (options) => {
  const {
    dominantColor = ThemeValues.dominantColor,
    itemLineHeight = 2,
    lightTextColor = ThemeValues.lightTextColor,
    numSize = 21,
    textColor = ThemeValues.textColor,
  } = options
  return Object.assign(
    {},
    asStyleData({
      '.the-step': {
        overflow: 'hidden',
        position: 'relative',
      },
      '.the-step-action.the-button-group': {
        boxSizing: 'border-box',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        maxWidth: '100%',
        padding: '0 16px',
      },
      '.the-step-button': {
        flexGrow: 0,
        whiteSpace: 'nowrap',
      },
      '.the-step-button-hidden': {
        visibility: 'hidden !important',
      },
      '.the-step-content': {
        position: 'relative',
        transition: 'height 300ms',
      },
      '.the-step-content-wrap': {
        display: 'block',
      },
      '.the-step-inner': {
        alignItems: 'flex-start',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        maxHeight: '100%',
        position: 'relative',
        transition: 'left 300ms',
      },
      '.the-step-scroll': {
        boxSizing: 'border-box',
        marginBottom: 32,
        transition: 'height 300ms',
        width: '100%',
      },
    }),
    asStyleData({
      '.the-step-bar': {
        alignItems: 'stretch',
        display: 'flex',
        flexWrap: 'nowrap',
        fontSize: 'small',
        justifyContent: 'space-between',
        margin: '8px 0',
      },
      '.the-step-bar-item': {
        '&:first-child': {
          '.the-step-bar-item-line': {
            left: '50%',
            width: '50%',
          },
        },
        '&:last-child': {
          '.the-step-bar-item-line': {
            right: '50%',
            width: '50%',
          },
        },
        '&.the-step-bar-item-active': {
          '.the-step-bar-item-line': {},
          '.the-step-bar-item-num': {
            background: dominantColor,
          },
          '&.the-step-bar-item-current': {
            '.the-step-bar-item-num': {
              background: dominantColor,
              transform: 'scale(1.3)',
            },
          },
          '&.the-step-bar-item-link:hover': {
            color: dominantColor,
          },
          color: dominantColor,
        },
        '&.the-step-bar-item-done': {
          '.the-step-bar-item-done-line': { width: '100%' },
          '&:last-child': {
            '.the-step-bar-item-done-line': { width: '0%' },
          },
        },
        '&.the-step-bar-item-link': {
          '&:hover': {
            color: textColor,
          },
          cursor: 'pointer',
        },
        alignItems: 'center',
        color: lightTextColor,
        display: 'inline-flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'flex-start',
        width: 'auto',
      },
      '.the-step-bar-item-content': {
        boxSizing: 'border-box',
        flexGrow: 1,
        fontSize: 'x-small',
        lineHeight: '1em',
        padding: '2px',
        textAlign: 'center',
      },
      '.the-step-bar-item-done-line': {
        background: dominantColor,
        height: itemLineHeight,
        left: '50%',
        position: 'absolute',
        right: 0,
        top: `calc(50% - ${itemLineHeight / 2}px)`,
        transition: 'width 100ms',
        width: 0,
        zIndex: 1,
      },
      '.the-step-bar-item-line': {
        background: '#AAA',
        height: itemLineHeight,
        left: 0,
        position: 'absolute',
        right: 0,
        top: `calc(50% - ${itemLineHeight / 2}px)`,
        width: '100%',
      },
      '.the-step-bar-item-num': {
        alignItems: 'center',
        background: '#AAA',
        borderRadius: '50%',
        boxSizing: 'border-box',
        color: 'white',
        display: 'inline-flex',
        fontSize: '9px',
        height: numSize,
        justifyContent: 'center',
        lineHeight: `${numSize}px`,
        margin: '8px 0',
        position: 'relative',
        textAlign: 'center',
        transform: 'scale(1)',
        transformOrigin: '50% 50%',
        transition: 'transform 300ms',
        width: numSize,
        zIndex: 2,
      },
      '.the-step-bar-item-shape': {
        alignItems: 'center',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
      },
    }),
  )
}

export default TheStepStyle
