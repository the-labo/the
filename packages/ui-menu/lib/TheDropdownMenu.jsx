'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ClickOutside from 'react-click-outside'
import { TheIcon } from '@the-/ui-icon'
import {
  changedProps,
  eventHandlersFor,
  htmlAttributesFor,
} from '@the-/util-ui'
import { get } from '@the-/window'
import TheMenu from './TheMenu'
import TheMenuItem from './TheMenuItem'

/**
 * Drop down menu
 */
class TheDropDownMenu extends React.Component {
  static Button(props) {
    const {
      children,
      className,
      icon = TheDropDownMenu.UP_ICON,
      onClick,
    } = props
    return (
      <a
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-dropdown-menu-button', className)}
        onClick={onClick}
        role='menubar'
      >
        <span className='the-dropdown-menu-button-text'>{children}</span>
        <TheIcon className={c('the-dropdown-menu-button-icon', icon)} />
      </a>
    )
  }

  static Item(props) {
    const { className } = props
    return (
      <TheMenuItem
        {...props}
        className={c('the-dropdown-menu-item', className)}
        role='menuitem'
      />
    )
  }

  constructor(props) {
    super(props)
    this.state = { open: props.open }
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.close = this.toggleDropDown.bind(this, false)
    this.open = this.toggleDropDown.bind(this, true)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.unlistenHistory = null
  }

  bindHistory(history) {
    const {
      props: { eventsToClose },
    } = this
    const window = get('window')
    for (const event of eventsToClose) {
      window.addEventListener(event, this.close)
    }
    this.unlistenHistory && this.unlistenHistory()
    if (history) {
      this.unlistenHistory = history.listen(this.close)
    }
  }

  componentDidMount() {
    const history = this.context.history || this.props.history
    this.bindHistory(history)
  }

  componentDidUpdate(prevProps) {
    const diff = changedProps(prevProps, this.props)
    if ('history' in diff) {
      this.bindHistory(this.props.history)
    }
  }

  componentWillUnmount() {
    const {
      props: { eventsToClose },
    } = this
    const window = get('window')
    for (const event of eventsToClose) {
      window.removeEventListener(event, this.close)
    }
    this.unlistenHistory && this.unlistenHistory()
  }

  handleClickOutside() {
    this.toggleDropDown(false)
  }

  render() {
    const {
      props,
      props: {
        children,
        className,
        icon = TheDropDownMenu.UP_ICON,
        label,
        righted,
      },
      state: { open },
    } = this

    return (
      <ClickOutside onClickOutside={this.handleClickOutside}>
        <div
          {...htmlAttributesFor(props, { except: ['className', 'label'] })}
          {...eventHandlersFor(props, { except: [] })}
          className={c('the-dropdown-menu', className, {
            'the-dropdown-menu-open': open,
            'the-dropdown-menu-righted': righted,
          })}
        >
          <div className='the-dropdown-menu-content'>
            <TheDropDownMenu.Button
              aria-expanded={open}
              icon={label ? icon : null}
              onClick={open ? this.close : this.open}
            >
              {label || <TheIcon className={icon} />}
            </TheDropDownMenu.Button>
            <div className='the-dropdown-menu-inner'>
              <TheMenu role='none'>{children}</TheMenu>
            </div>
          </div>
        </div>
      </ClickOutside>
    )
  }

  toggleDropDown(open) {
    if (arguments.length === 0) {
      open = !this.state.open
    }

    const skip = this.state.open === open
    if (skip) {
      return
    }

    this.setState({ open })
  }
}

TheDropDownMenu.UP_ICON = 'fa fa-caret-up'

TheDropDownMenu.propTypes = {
  /** Event types to close for */
  eventsToClose: PropTypes.arrayOf(PropTypes.string),
  /** Label for toggle button */
  label: PropTypes.node,
  /** Open  when mounted */
  open: PropTypes.bool,
  /** Show on righthand */
  righted: PropTypes.bool,
}

TheDropDownMenu.defaultProps = {
  eventsToClose: ['hashchange'],
  open: false,
  righted: false,
  role: 'menu',
}

TheDropDownMenu.displayName = 'TheDropDownMenu'

export default TheDropDownMenu
