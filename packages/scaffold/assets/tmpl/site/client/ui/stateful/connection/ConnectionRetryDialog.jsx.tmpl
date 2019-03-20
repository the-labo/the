/**
 * ConnectionRetryDialog component
 */
'use strict'

import React from 'react'
import { TheConnectionRetryDialog } from 'the-site-components'
import { Icons } from '@self/conf'
import context from '../../context'

class ConnectionRetryDialog extends React.Component {
  #stateful = context.stateful(
    (state) => ({
      active: state['connection.retry.active'],
      busy: state['connection.retry.busy'],
    }),
    ({
       l,
       connectionRetryScene: retryScene,
     }) => ({
      l,
      onClose: async () => retryScene.init(),
      onReload: async () => {
        await retryScene.doExec()
      },
    })
  )

  render () {
    return this.#stateful(
      ({
         active,
         busy,
         l,
         onClose,
         onReload,
       }) => (
        <TheConnectionRetryDialog {...{ active, busy, onClose, onReload }}
                                  lead={l('messages.CONNECTION_SEEMS_TO_BE_LOST')}
                                  reloadIcon={Icons.RELOAD_ICON}
                                  submitText={l('buttons.DO_RELOAD')}
                                  title={l('titles.CONNECTION_RETRY_TITLE')}
                                  warningIcon={Icons.WARNING_ICON}
        />
      )
    )
  }
}

export default ConnectionRetryDialog
