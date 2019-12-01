'use strict'

import c from 'classnames'
import React from 'react'
import { TheSpin } from '@the-/ui-spin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

export default function TheTabContent(props) {
  const { children, className, spinning } = props
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className', 'spinning'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-tab-content', className)}
    >
      {spinning && <TheSpin className='the-tab-content-spin' cover enabled />}

      {children}
    </div>
  )
}
