'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import ClickOutside from '@okunishinishi/react-click-outside'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import { get } from '@the-/window'
import TheDropDownMenuButton from './partials/TheDropDownMenuButton'
import TheDropDownMenuItem from './partials/TheDropDownMenuItem'
import TheMenu from './TheMenu'

/**
 * Drop down menu
 */
const TheDropDownMenu = (props) => {
  const {
    children,
    className,
    eventsToClose = [],
    history,
    icon = TheDropDownMenu.UP_ICON,
    label,
    righted,
  } = props
  const [open, setOpen] = useState(!!props.open)
  const onClose = useCallback(() => setOpen(false), [setOpen])
  const onOpen = useCallback(() => setOpen(true), [setOpen])

  useEffect(() => {
    const window = get('window')
    for (const event of eventsToClose) {
      window.addEventListener(event, onClose)
    }
    return () => {
      for (const event of eventsToClose) {
        window.removeEventListener(event, onClose)
      }
    }
  }, [eventsToClose, onClose])

  useEffect(() => {
    setOpen(props.open)
  }, [props.open, setOpen])

  useEffect(() => {
    if (!history) {
      return
    }
    const unlisten = history.listen(onClose)
    return () => {
      unlisten()
    }
  }, [history, onClose])

  return (
    <ClickOutside onClickOutside={onClose}>
      <div
        {...htmlAttributesFor(props, { except: ['className', 'label'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-dropdown-menu', className, {
          'the-dropdown-menu-open': open,
          'the-dropdown-menu-righted': righted,
        })}
      >
        <div className='the-dropdown-menu-content'>
          <TheDropDownMenuButton
            aria-expanded={open}
            icon={label ? icon : null}
            onClick={open ? onClose : onOpen}
          >
            {label || <TheIcon className={icon} />}
          </TheDropDownMenuButton>
          <div className='the-dropdown-menu-inner'>
            <TheMenu role='none'>{children}</TheMenu>
          </div>
        </div>
      </div>
    </ClickOutside>
  )
}

TheDropDownMenu.Item = TheDropDownMenuItem

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
