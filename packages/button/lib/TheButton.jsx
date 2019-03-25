'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { textColorFor } from 'the-color'
import { unlessProduction } from '@the-/check'
import { TheIcon } from '@the-/icon'
import { TheLink } from '@the-/link'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'
import TheButtonGroup from './TheButtonGroup'

/**
 * Button of the-components
 */
class TheButton extends React.Component {
  static Next(props) {
    return <TheButton iconRight={TheButton.NEXT_ICON} {...props} />
  }

  static Prev(props) {
    return <TheButton icon={TheButton.PREV_ICON} {...props} />
  }

  static Spinner() {
    return (
      <span className='the-button-spinner'>
        <TheIcon.Spin className='the-button-spinner-icon' />
      </span>
    )
  }

  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.lastClickedAt = null
  }

  handleClick(e) {
    const { minInterval, onClick, onSubmit } = this.props
    if (this.lastClickedAt) {
      const sinceLast = new Date() - this.lastClickedAt
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
    this.lastClickedAt = new Date()
  }

  handleKeyDown(e) {
    const { onClick, onKeyDown, onSubmit } = this.props
    switch (e.keyCode) {
      case 32: // Space key
        e.preventDefault()
        onSubmit && onSubmit()
        onClick && onClick()
        break
      default:
        break
    }
    onKeyDown && onKeyDown(e)
  }

  render() {
    const { props } = this
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
        onClick={this.handleClick}
        {...{ style, target, to }}
        href={(!to && props.href) || 'javascript:void(0)'}
        onKeyDown={this.handleKeyDown}
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
              className={c(
                'the-button-icon',
                'the-button-icon-right',
                iconRight,
              )}
            />
          )}
        </span>
      </A>
    )
  }
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

export default TheButton
