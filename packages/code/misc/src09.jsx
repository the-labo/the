/**
 * App component
 */
'use strict'

import React from 'react'
import {
  TheRoot,
  TheMain,
} from 'the-components'

import { Header, Toasts, Footer } from './layouts'
import Routes from './Routes'
import { withProvider, withStore, } from 'the-store'
import { withLoc, } from 'the-loc'
import { withCycle, asBound, } from 'the-hoc'
import { withBinder, } from 'the-handle'
import { withClient } from 'the-client'
import { locales } from '@self/conf'
import { CautionDisconnectedDialog } from './bounds'

function App ({busy}) {
  return (
    <TheRoot>
      <Header/>
      <Toasts/>
      <TheMain spinning={busy}>
        <Routes/>
      </TheMain>
      <Footer/>
      <CautionDisconnectedDialog/>
    </TheRoot>
  )

}

const ConnectedApp = asBound(
  withCycle(withClient(withStore(App))),
  (state) => ({
    busy: state['app.busy'],
  }),
  ({
     accountScene,
     appScene,
     verifyNeedScene,
   }) => ({
    onMount: async () => {
      await accountScene.doSync()
      await verifyNeedScene.doSync({delay: 3 * 1000})
    },
  })
)

export default withBinder(withProvider(
  withClient.root(
    withLoc.root(ConnectedApp, locales)
  )
))
