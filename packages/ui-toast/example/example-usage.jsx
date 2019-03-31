'use strict'

import React from 'react'
import { TheToast, TheToastGroup, TheToastStyle } from '@the-/ui-toast'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      messages: {
        normal: ['This is normal', 'This is normal 2'],
        info: ['This is info', 'This is info 2'],
        warn: ['This is warn', 'This is warn 2'],
        error: ['This is error', 'This is error 2']
      }
    }
  }

  render() {
    const { messages } = this.state
    const onUpdate = (values) => this.setState({
      messages: Object.assign({}, this.state.messages, values)
    })
    return (
      <React.StrictMode>
        <div>
          <TheToastStyle />
          <TheToastGroup>
            <TheToast.Normal onUpdate={onUpdate} messages={messages.normal} />
            <TheToast.Info onUpdate={onUpdate} messages={messages.info} clearAfter={1200} />
            <TheToast.Warn onUpdate={onUpdate} messages={messages.warn} />
            <TheToast.Error onUpdate={onUpdate} messages={messages.error} />
          </TheToastGroup>
        </div>
      </React.StrictMode>
    )
  }
}

export default ExampleComponent
