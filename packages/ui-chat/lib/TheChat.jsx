'use strict'

import c from 'classnames'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheChatForm from './TheChatForm'
import TheChatTimeLine from './TheChatTimeLine'
import TheChatTimeLineItem from './TheChatTimeLineItem'

/**
 * Chat UI of the-components
 */
const TheChat = (props) => {
  const { children, className } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-chat', className)}
    >
      {children}
    </div>
  )
}

TheChat.Form = TheChatForm
TheChat.TimeLine = TheChatTimeLine
TheChat.TimeLineItem = TheChatTimeLineItem

TheChat.propTypes = {}

TheChat.defaultProps = {}

TheChat.displayName = 'TheChat'

export default TheChat
