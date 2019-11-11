'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { unlessProduction } from '@the-/check'
import { TheIcon } from '@the-/ui-icon'
import { TheLink } from '@the-/ui-link'
import { textColorFor } from '@the-/util-color'
import { eventHandlersFor, htmlAttributesFor, isKeyCode } from '@the-/util-ui'
import TheButtonGroup from './TheButtonGroup'

/**
 * Button of the-components
 * @param props
 * @returns {*}
 */
const TheButton = (props) => {
  const {
    children,
    className,
    color,
    danger,
    disabled,
    floated,
    icon,
    iconRight,
    large,
    largeIcon,
    light,
    minInterval,
    onClick,
    onKeyDown,
    onSubmit,
    primary,
    rounded,
    simple,
    small,
    spinning,
    style = {},
    target,
    text,
    to,
    wide,
  } = props
  const [lastClickedAt, setLastClickedAt] = useState(null)
  const handleClick = useCallback(
    (e) => {
      if (lastClickedAt) {
        const sinceLast = new Date() - lastClickedAt
        const tooSoon = sinceLast < minInterval
        if (tooSoon) {
          unlessProduction(() => {
            console.warn(
              `[TheButton] Prevent double click ( minInterval: ${minInterval}ms, actual: ${sinceLast}ms )`,
            )
          })
          return
        }
      }

      onClick && onClick(e)
      onSubmit && onSubmit()
      setLastClickedAt(new Date())
    },
    [lastClickedAt, setLastClickedAt, onSubmit, onClick],
  )

  const handleKeyDown = useCallback(
    (e) => {
      const shouldSubmit =
        isKeyCode.enter(e.keyCode) || isKeyCode.space(e.keyCode)
      if (shouldSubmit) {
        e.preventDefault()
        onSubmit && onSubmit()
        onClick && onClick()
      }

      onKeyDown && onKeyDown(e)
    },
    [onSubmit, onClick, onKeyDown],
  )

  const A = to ? TheLink : 'a'

  const applyColor = color && !danger && !disabled
  if (applyColor && style) {
    style.borderColor = color
    if (primary) {
      style.backgroundColor = color
      style.color = textColorFor(color)
    } else {
      style.color = color
    }
  }

  return (
    <A
      {...htmlAttributesFor(props, {
        except: ['className', 'style', 'icon', 'to', 'color', 'iconRight'],
      })}
      {...eventHandlersFor(props, { except: ['onClick'] })}
      aria-busy={spinning}
      className={c('the-button', className, {
        'the-button-danger': danger,
        'the-button-disabled': disabled,
        'the-button-floated': floated,
        'the-button-large': large,
        'the-button-light': light,
        'the-button-primary': primary,
        'the-button-rounded': rounded,
        'the-button-simple': simple,
        'the-button-small': small,
        'the-button-spinning': spinning,
        'the-button-vertical': !!largeIcon,
        'the-button-wide': wide,
      })}
      href={(!to && props.href) || null}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      tabIndex={disabled ? '-1' : '0'}
      target={target}
      to={to}
    >
      <span className='the-button-inner'>
        {spinning && <TheButton.Spinner />}
        {largeIcon && (
          <TheIcon className={c('the-button-large-icon', largeIcon)} />
        )}
        {icon && <TheIcon className={c('the-button-icon', icon)} />}
        {text && <span className={c('the-button-text')}>{text}</span>}
        {children}
        {iconRight && (
          <TheIcon
            className={c('the-button-icon', 'the-button-icon-right', iconRight)}
          />
        )}
      </span>
    </A>
  )
}

TheButton.Group = TheButtonGroup
TheButton.PREV_ICON = 'fas fa-caret-left'
TheButton.NEXT_ICON = 'fas fa-caret-right'

TheButton.propTypes = {
  /** Color theme */
  color: PropTypes.string,
  /** Danger style */
  danger: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Floated style */
  floated: PropTypes.bool,
  /** Icon class */
  icon: PropTypes.string,
  /** Large style */
  large: PropTypes.bool,
  /** Large icon class */
  largeIcon: PropTypes.string,
  /** Light color */
  light: PropTypes.bool,
  /** Minimum interval */
  minInterval: PropTypes.number,
  /** Handle submit */
  onSubmit: PropTypes.func,
  /** Primary style */
  primary: PropTypes.bool,
  /** Rounded style */
  rounded: PropTypes.bool,
  /** Simple style */
  simple: PropTypes.bool,
  /** Small style */
  small: PropTypes.bool,
  /** Show spinner */
  spinning: PropTypes.bool,
  /** Button text */
  text: PropTypes.string,
  /** Wide style */
  wide: PropTypes.bool,
}

TheButton.defaultProps = {
  color: null,
  danger: false,
  disabled: false,
  floated: false,
  icon: null,
  large: false,
  largeIcon: null,
  light: false,
  minInterval: 300,
  onSubmit: null,
  primary: false,
  role: 'button',
  rounded: false,
  simple: false,
  small: false,
  spinning: false,
  text: null,
  wide: false,
}

TheButton.displayName = 'TheButton'

TheButton.Next = function TheButtonNext(props) {
  return <TheButton iconRight={TheButton.NEXT_ICON} {...props} />
}

TheButton.Prev = function TheButtonPrev(props) {
  return <TheButton icon={TheButton.PREV_ICON} {...props} />
}

TheButton.Spinner = function TheButtonSpinner() {
  return (
    <span className='the-button-spinner'>
      <TheIcon.Spin className='the-button-spinner-icon' />
    </span>
  )
}

export default TheButton
