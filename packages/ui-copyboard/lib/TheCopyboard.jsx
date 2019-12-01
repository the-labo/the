'use strict'

import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import select from 'select'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Component for clip-to-copy
 */
const TheCopyboard = (props) => {
  const {
    children,
    className,
    href,
    onClick,
    text,
    tipDuration,
    tipText,
  } = props
  const [tipShown, setTipShown] = useState(false)
  const [tipOffTimer, setTipOffTimer] = useState(-1)
  const anchorRef = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(tipOffTimer)
    },
    [tipOffTimer],
  )

  const showTip = useCallback(() => {
    clearTimeout(tipOffTimer)
    setTipShown(true)
    const newTipOffTimer = setTimeout(() => {
      setTipShown(false)
    }, tipDuration)
    setTipOffTimer(newTipOffTimer)
    return () => {
      clearTimeout(newTipOffTimer)
    }
  }, [tipDuration, tipOffTimer])

  const doCopy = useCallback(() => {
    copy(text)
    select(anchorRef.current)
    showTip()
  }, [text])

  const handleClick = useCallback(
    (e) => {
      doCopy()
      onClick && onClick(e)
      e.stopPropagation()
    },
    [onClick, doCopy],
  )

  const hideTip = useCallback(() => {
    clearTimeout(tipOffTimer)
    if (tipShown) {
      setTipShown(false)
    }
  }, [tipOffTimer, tipShown])

  const Anchor = href ? 'a' : 'span'
  return (
    <span
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-copyboard', className)}
    >
      {tipShown && (
        <span className='the-copyboard-tip' onClick={hideTip}>
          <span className='the-copyboard-tip-square' />
          {tipText}
        </span>
      )}
      <Anchor
        className='the-copyboard-anchor'
        href={href}
        onClick={handleClick}
        ref={anchorRef}
      >
        {text}
        {children}
      </Anchor>
    </span>
  )
}

TheCopyboard.propTypes = {
  /** Text to show */
  text: PropTypes.string.isRequired,
  /** Duration to shows tip */
  tipDuration: PropTypes.number,
  /** Text for tip */
  tipText: PropTypes.string,
}

TheCopyboard.defaultProps = {
  href: null,
  tipDuration: 800,
  tipText: 'Copied',
}

TheCopyboard.displayName = 'TheCopyboard'

export default TheCopyboard
