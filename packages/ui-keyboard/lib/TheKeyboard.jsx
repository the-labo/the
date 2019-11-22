'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheKeyboardButton from './TheKeyboardButton'

/**
 * Keyboard component
 */
const TheKeyboard = (props) => {
  const { children, className, keys, onKeyPress } = props

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-keyboard', className)}
    >
      <div className='the-keyboard-grid'>
        {keys.map((row, i) => (
          <div className='the-keyboard-row' key={i}>
            {row.map((value, j) => (
              <TheKeyboard.Button
                key={`${i}-${j}`}
                onClick={onKeyPress}
                value={value}
              />
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}

TheKeyboard.propTypes = {
  /** Keys to show */
  keys: PropTypes.arrayOf(PropTypes.array).isRequired,
  /** Handle key press */
  onKeyPress: PropTypes.func.isRequired,
}

TheKeyboard.defaultProps = {
  keys: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, null],
  ],
  onKeyPress: () => null,
}

TheKeyboard.Button = TheKeyboardButton

TheKeyboard.displayName = 'TheKeyboard'

export default TheKeyboard
