'use strict'

import React, { useState } from 'react'
import { TheToast, TheToastGroup } from '@the-/ui-toast'
import { TheToastStyle } from '@the-/ui-toast/styles'

const ExampleComponent = () => {
  const [messages, setMessages] = useState({
    error: ['This is error', 'This is error 2'],
    info: ['This is info', 'This is info 2'],
    normal: ['This is normal', 'This is normal 2'],
    warn: ['This is warn', 'This is warn 2'],
  })
  const onUpdate = (newValues) =>
    setMessages(Object.assign({}, messages, newValues))
  return (
    <React.StrictMode>
      <div>
        <TheToastStyle />
        <TheToastGroup>
          <TheToast.Normal messages={messages.normal} onUpdate={onUpdate} />
          <TheToast.Info
            clearAfter={1200}
            messages={messages.info}
            onUpdate={onUpdate}
          />
          <TheToast.Warn messages={messages.warn} onUpdate={onUpdate} />
          <TheToast.Error messages={messages.error} onUpdate={onUpdate} />
        </TheToastGroup>
      </div>
    </React.StrictMode>
  )
}

export default ExampleComponent
