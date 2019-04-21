/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { UI } from '@self/conf'
import { TheToast, TheToastGroup } from '@the-/ui'
import context from '../context'

class Toasts extends React.Component {
  #stateful = context.stateful(
    (state) => ({
      error: state['toast.error'],
      info: state['toast.info'],
      warn: state['toast.warn'],
    }),
    ({ toastScene }) => ({
      onReset: (queues) => toastScene.reset(queues),
    }),
  )

  render() {
    const duration = UI.TOAST_DURATION
    return this.#stateful(({ error, info, onReset, warn }) => (
      <TheToastGroup>
        <TheToast.Info
          clearAfter={duration}
          messages={info}
          onUpdate={onReset}
        />
        <TheToast.Warn
          clearAfter={duration}
          messages={warn}
          onUpdate={onReset}
        />
        <TheToast.Error
          clearAfter={duration}
          messages={error}
          onUpdate={onReset}
        />
      </TheToastGroup>
    ))
  }
}

export default Toasts
