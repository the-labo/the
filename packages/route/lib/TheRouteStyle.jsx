'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { asStyleData } from '@the-/util-ui'
import { TheStyle } from '@the-/ui-style'

/** Style for TheRoute */
const TheRouteStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-button-style', className)}
    styles={TheRouteStyle.data(options)}
  />
)

TheRouteStyle.displayName = 'TheRouteStyle'
TheRouteStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheRouteStyle.defaultProps = {
  options: {},
}

TheRouteStyle.data = (options) => {
  const { ThemeValues } = TheStyle
  const { animationDuration = 400, dangerColor = '#A33' } = options
  return Object.assign(
    {},
    asStyleData('.the-route', {
      '&': {},
    }),
    asStyleData('.the-route-stack', {
      '.the-route': {
        flexShrink: 0,
        position: 'relative',
        transition: `margin ${animationDuration}ms`,
        width: '100%',
        zIndex: 1,
      },
      '.the-route-stack-inner': {
        display: 'flex',
        overflow: 'hidden',
        transition: `height ${animationDuration / 2}ms`,
      },
      '&': {
        overflow: 'hidden',
      },
      '&.the-route-stack-horizontal': {
        '.the-route': {
          '&.the-route-active': {
            '&:first-child': {
              marginLeft: 0,
            },
            '&.the-route-gone': {
              marginLeft: 0,
            },
            marginLeft: '-100%',
          },
          marginLeft: 0,
        },
        '.the-route-stack-inner': {
          flexDirection: 'row',
        },
      },
      '&.the-route-stack-vertical': {
        '.the-route': {
          '&:first-child': {
            height: 'auto',
            position: 'static',
            top: '0',
          },
          '&.the-route-active': {
            '&:first-child': {
              top: 0,
            },
            '&.the-route-gone': {
              top: '100%',
            },
            top: 0,
          },
          height: '100%',
          left: 0,
          overflow: 'auto',
          position: 'absolute',
          right: 0,
          top: '100%',
          transition: `top ${animationDuration}ms`,
          zIndex: 1,
        },
        '.the-route-stack-inner': {
          flexDirection: 'column',
          height: 'auto !important',
          position: 'relative',
        },
      },
    }),
  )
}

export default TheRouteStyle
