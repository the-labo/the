/**
 * ConnectionRetryDialog component
 */
'use strict'

import React from 'react'
import { Icons } from '@self/conf'
import { TheButton, TheButtonGroup, TheDialog } from '@the-/ui'
import context from '../../context'

class ConnectionRetryDialog extends React.Component {
  #stateful = context.stateful(
    (state) => ({
      active: state['connection.retry.active'],
      busy: state['connection.retry.busy'],
    }),
    ({ connectionRetryScene: retryScene, l }) => ({
      l,
      onClose: async () => retryScene.init(),
      onReload: async () => {
        await retryScene.doExec()
      },
    }),
  )

  render() {
    return this.#stateful(({ active, busy, l, onClose, onReload }) => {
      if (!active) {
        return null
      }
      return (
        <TheDialog
          icon={Icons.WARNING_ICON}
          lead={l('messages.CONNECTION_SEEMS_TO_BE_LOST')}
          onClose={onClose}
          present
          spinning={busy}
          title={l('titles.CONNECTION_RETRY_TITLE')}
        >
          <TheButtonGroup>
            <TheButton icon={Icons.RELOAD_ICON} onClick={onReload}>
              {l('buttons.DO_RELOAD')}
            </TheButton>
          </TheButtonGroup>
        </TheDialog>
      )
    })
  }
}

export default ConnectionRetryDialog
