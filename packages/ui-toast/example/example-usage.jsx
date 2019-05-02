'use strict'

import React from 'react'
import { TheToast, TheToastGroup, TheToastStyle } from '@the-/ui-toast'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      messages: {
        error: ['This is error', 'This is error 2'],
        info: ['This is info', 'This is info 2'],
        normal: ['This is normal', 'This is normal 2'],
        warn: ['This is warn', 'This is warn 2'],
      },
    }
  }

  render() {
    const { messages } = this.state
    const onUpdate = (values) =>
      this.setState({
        messages: Object.assign({}, this.state.messages, values),
      })
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
}

export default ExampleComponent
