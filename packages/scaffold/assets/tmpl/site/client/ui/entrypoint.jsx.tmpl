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
import context from './context'
import Fallback from './stateful/fallback/Fallback'

const App = lazy(() => import('./App'))

singleton()
patch()

once('DOMContentLoaded', async () => {
  const debugMode = !isProduction()

  const props = get(GlobalKeys.PROPS)
  const { lang = get('navigator.language').split('-')[0], workerScopes } = props
  await workers(workerScopes)

  const { default: client } = await import('../client')
  const { default: handle } = await import('../handle')
  const { default: store } = await import('../store')

  const history = historyFor()

  const l = locales.bind(lang)
  context.set({ handle, history, l, lang, state: store.state })
  store.subscribe(() => context.set({ state: store.state }))

  const controllers = await client.useAll({ debug: !isProduction() })

  handle.setAttributes({ client, controllers, history, l, lang, store })
  handle.initAll()

  const { appScene, toastScene } = handle
  history.listen((location) => appScene.handleLocationChange(location))
  appScene.setLocation(history.location)
  appScene.set({ host: get('location.host'), locale: lang })

  rescue((e) => {
    const handled = appScene.handleRejectionReason(e.reason)
    if (!handled) {
      toastScene.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  quelize(() => ({
    locale: store.state['app.locale'],
  }))

  const app = (
    <Suspense fallback={<Fallback />}>
      <App {...props} {...{ client, handle, history, store }} />
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

  set(GlobalKeys.HANDLE, handle)
  set(GlobalKeys.STORE, store)
  set(GlobalKeys.CONTEXT, context)

  if (debugMode) {
    const { default: metrics } = await import('./metrics')
    metrics()
  }
})
