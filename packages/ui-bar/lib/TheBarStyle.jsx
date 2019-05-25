'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheStyle } from '@the-/ui-style'
import { asStyleData } from '@the-/util-ui'

/** Style for TheBar */
const TheBarStyle = ({ className, id, options }) => (
  <TheStyle
    className={classnames('the-bar-style', className)}
    id={id}
    styles={TheBarStyle.data(options)}
  />
)

TheBarStyle.displayName = 'TheBarStyle'
TheBarStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheBarStyle.defaultProps = {
  options: {},
}

TheBarStyle.data = () =>
  Object.assign(
    {},
    ...[
      asStyleData({
        '.the-bar': {
          display: 'flex',
          justifyContent: 'space-between',
        },
      }),
      asStyleData({
        '.the-action-bar': {
          background: 'rgba(0, 0, 0, 0.9)',
          borderTop: '1px solid #333',
          bottom: '0',
          boxShadow: '-1px -1px 4px rgba(0, 0, 0, 0.33)',
          color: 'white',
          left: '0',
          position: 'fixed',
          right: '0',
          transition: 'bottom 400ms',
          zIndex: '4',
        },
        '.the-action-bar-button': {},
        '.the-action-bar-buttons': {},
        '.the-action-bar-inner': {
          padding: '16px 8px',
        },
        '.the-action-bar-lead': {
          color: '#888',
          fontSize: 'smaller',
          margin: '0 0 8px',
          padding: '0 8px',
        },
        '.the-action-bar.the-action-bar-hidden': {
          bottom: '-100%',
        },
      }),
    ],
  )

export default TheBarStyle
