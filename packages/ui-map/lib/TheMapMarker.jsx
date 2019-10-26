'use strict'

import c from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

const TheMapMarker = (props) => {
  const { children, className, container } = props
  if (!container) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      {...htmlAttributesFor(props, {
        except: ['className', 'width', 'height'],
      })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-map-marker', className)}
    >
      {children}
    </div>,
    container,
  )
}

export default TheMapMarker
