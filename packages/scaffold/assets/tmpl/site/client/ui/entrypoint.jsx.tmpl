'use strict'

import '@the-/polyfill/apply'
import React, { lazy, Suspense } from 'react'
import { GlobalKeys, locales, UI } from '@self/conf'
import { isProduction } from '@the-/check'
import {
  history as historyFor,
  mount,
  patch,
  quelize,
  singleton,
  workers,
} from '@the-/entrypoint'
import { get, once, rescue, set } from '@the-/window'
import context, { loader } from './context'
import Fallback from './stateful/fallback/Fallback'
import { ActMapping } from '../mappings'

singleton()
patch()

once('DOMContentLoaded', async () => {
  const debugMode = !isProduction()

  const props = get(GlobalKeys.PROPS)
  const { lang = get('navigator.language').split('-')[0], workerScopes } = props
  await workers(workerScopes)

  const { default: client } = await import('../client')
  const { default: store } = await import('../store')

  const history = historyFor()

  loader.loadStore(store)
  const l = loader.loadLocale(locales, lang)
  const controllers = await client.useAll({ debug: !isProduction() })
  const actions = loader.loadActions(ActMapping, {
    controllers,
    history,
  })

  const { appAct, connectionRetryAct, locationAct, toastAct } = actions
  locationAct.bindHistory(history)
  connectionRetryAct.bindClient(client)
  rescue((e) => {
    const handled = appAct.handleRejectionReason(e.reason)
    if (!handled) {
      toastAct.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  quelize(() => ({
    locale: store.state['app.locale'],
  }))
  appAct.setLocale(lang)

  const App = lazy(() => import('./App'))
  const app = (
    <Suspense fallback={<Fallback />}>
      <App {...props} client={client} history={history} store={store} />
    </Suspense>
  )

  await mount(app, UI.APP_CONTAINER_ID, {
    history,
    router: true,
    strictMode: true,
  })

  console.debug(
    `The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`,
    props,
  )

  set(GlobalKeys.STORE, store)
  set(GlobalKeys.CONTEXT, context)

  if (debugMode) {
    const { default: metrics } = await import('./metrics')
    metrics()

    const { default: axe } = await import('@the-/axe')
    axe.start()
  }
})
