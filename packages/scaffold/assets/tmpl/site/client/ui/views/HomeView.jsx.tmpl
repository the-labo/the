/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { TheButton, TheCycle, TheMeta, TheView } from 'the-components'
import styles from './HomeView.pcss'
import context from '../context'

class HomeView extends React.Component {
  #stateful = context.stateful(
    (state) => ({
      busy: state['home.busy'],
      count: state['home.count'],
    }),
    ({
       l,
       toastScene,
       homeScene
     }, pipedProxy) => ({
      onCountUp: async () => {
        await homeScene.countUp()
        await toastScene.showInfo(l('toasts.COUNT_UP_DID_SUCCESS'))
        console.log('new Count:', pipedProxy.count)
      },
      onReceive: async (received) => {

      },
      onMount: async () => {

      },
      onUnmount: async () => {

      }
    }),
  )

  render () {
    return this.#stateful(
      ({
         busy,
         count,
         l,
         onCountUp,
         onMount,
         onReceive,
         onUnmount,
       }) => {
        const title = null
        return (
          <TheCycle {...{ onMount, onReceive, onUnmount }}
                    values={{}}
          >
            <TheMeta title={title}>
              <TheView className={styles.self}>
                <TheView.Header icon={null}
                                text={title}
                />
                <TheView.Body>
                  <p>
                    <span>Count={count}</span>
                    <TheButton onClick={onCountUp}
                               spinning={busy}
                    >
                      {l('buttons.DO_COUNT_UP')}
                    </TheButton>
                  </p>
                </TheView.Body>
              </TheView>
            </TheMeta>
          </TheCycle>
        )
      })
  }
}

export default HomeView
