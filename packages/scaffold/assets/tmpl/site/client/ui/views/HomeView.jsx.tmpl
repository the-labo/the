/**
 * HomeView component
 */
'use strict'

import memoizeOne from 'memoize-one'
import React from 'react'
import { TheButton, TheCycle, TheMeta, TheView } from '@the-/ui'
import styles from './HomeView.pcss'
import { Handle, Stateful } from '../context'

const stateful = Stateful((state) => ({
  busy: state['home.busy'],
  count: state['home.count'],
}))

const handle = Handle(({ actions: { homeAct, toastAct }, l }) => ({
  onCountUpFor: memoizeOne((count) => async () => {
    await homeAct.countUp()
    await toastAct.showInfo(l('toasts.COUNT_UP_DID_SUCCESS'))
    console.log('new Count:', count)
  }),
  onMount: async () => {},
  onReceive: async () => {},
  onUnmount: async () => {},
}))

const HomeView = React.memo(() => {
  const title = null
  return stateful(({ busy, count, l }) => (
    <TheCycle
      onMount={handle.onMount}
      onReceive={handle.onReceive}
      onUnmount={handle.onUnmount}
      values={{}}
    >
      <TheMeta title={title}>
        <TheView className={styles.self}>
          <TheView.Header icon={null} text={title} />
          <TheView.Body>
            <p>
              <span>Count={count}</span>
              <TheButton onClick={handle.onCountUpFor(count)} spinning={busy}>
                {l('buttons.DO_COUNT_UP')}
              </TheButton>
            </p>
          </TheView.Body>
        </TheView>
      </TheMeta>
    </TheCycle>
  ))
})

export default HomeView
