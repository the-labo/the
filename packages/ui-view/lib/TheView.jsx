'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { TheButton } from '@the-/ui-button'
import { TheContainer } from '@the-/ui-container'
import { TheIcon } from '@the-/ui-icon'
import { TheSpin } from '@the-/ui-spin'
import {
  eventHandlersFor,
  htmlAttributesFor,
  newId,
  toggleBodyClass,
} from '@the-/util-ui'
import TheViewStyle from './TheViewStyle'

/**
 * View of the-components
 */
const TheView = (props) => {
  const { children, className, fixed, spinning } = props
  const id = useMemo(() => props.id || newId({ prefix: 'the-view-' }), [
    props.id,
  ])
  useEffect(() => {
    toggleBodyClass(`the-view-fix-for-${id}`, fixed)
  }, [fixed, id])

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-busy={spinning}
      className={c('the-view', className, {
        'the-view-fixed': fixed,
      })}
      id={id}
    >
      {fixed && (
        <style className='the-view-fix-style'>
          {`.the-view-fix-for-${id} {overflow: hidden !important;}`}
        </style>
      )}
      <TheSpin
        className='the-view-spin'
        cover
        enabled={spinning}
        size='xx-large'
      />
      {children}
    </div>
  )
}

TheView.Body = function Body(props) {
  const { children, className, narrow } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-view-body', className, {
        'the-view-body-narrow': narrow,
      })}
    >
      <TheContainer className='the-view-body-inner'>{children}</TheContainer>
    </div>
  )
}

TheView.Header = function Header(props) {
  const {
    children,
    className,
    icon,
    leftIcon,
    leftNode = null,
    leftText,
    leftTo,
    narrow,
    onLeftClick,
    onRightClick,
    rightIcon,
    rightNode = null,
    rightText,
    rightTo,
    text,
  } = props

  const { HeaderButton } = TheView

  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-view-header', className, {
        'the-view-header-narrow': narrow,
      })}
      role='article'
    >
      <TheContainer className='the-view-header-inner'>
        <span className='the-view-header-col'>
          {leftNode}
          <HeaderButton
            icon={leftIcon}
            onClick={onLeftClick}
            text={leftText}
            to={leftTo}
          />
        </span>
        <span className='the-view-header-col'>
          <span className='the-view-header-title'>
            {icon && <TheIcon className={c('the-view-header-icon', icon)} />}
            {text && <span className='the-view-header-text'>{text}</span>}
            {children && (
              <span className='the-view-header-children'>{children}</span>
            )}
          </span>
        </span>
        <span className='the-view-header-col'>
          <HeaderButton
            icon={rightIcon}
            onClick={onRightClick}
            text={rightText}
            to={rightTo}
          />
          {rightNode}
        </span>
      </TheContainer>
    </div>
  )
}

TheView.HeaderButton = function HeaderButton({ icon, onClick, text, to }) {
  const valid = icon || text || onClick || to
  if (!valid) {
    return null
  }

  return (
    <TheButton
      className='the-view-header-button'
      icon={icon}
      onClick={onClick}
      simple
      text={text}
      to={to}
    />
  )
}

TheView.Message = function Message(props) {
  const { children, className } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-view-message', className)}
    >
      {children}
    </div>
  )
}

TheView.BACK_ICON = 'fa fa-angle-left'
TheView.DROPDOWN_ICON = 'fa fa-ellipsis-v'

TheView.Style = TheViewStyle

TheView.propTypes = {
  /** Show spinner */
  /** Mark as fixed */
  fixed: PropTypes.bool,
  spinning: PropTypes.bool,
}

TheView.defaultProps = {
  fixed: false,
  role: 'article',
  spinning: false,
}

TheView.displayName = 'TheView'

export default TheView
