'use strict'

import 'the-polyfill/apply'
import React from 'react'
import { isProduction } from 'the-check'
import { history as historyFor, mount, patch, quelize, singleton, workers } from 'the-entrypoint'
import { get, once, rescue, set } from 'the-window'
import { GlobalKeys, locales, UI, Urls } from '@self/conf'
import App from './App'
import context from './context'
import metrics from './metrics'
import client from '../client'
import handle from '../handle'
import store from '../store'

singleton()
patch()

void workers({
  '/': Urls.JS_ROOT_SERVICE_WORKER_URL,
})

once('DOMContentLoaded', async () => {
  const debugMode = !isProduction()

  const props = get(GlobalKeys.PROPS)
  const {
    lang = (get('navigator.language')).split('-')[0],
  } = props
  const history = historyFor()
  const l = locales.bind(lang)
  context.set({ handle, history, l, lang, state: store.state })
  store.subscribe(() => context.set({ state: store.state }))
  const controllers = await client.useAll({ debug: debugMode })

  const app = (<App {...props} {...{ client, handle, history, store }}/>)

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

  await mount(app, UI.APP_CONTAINER_ID, { history, router: true })
  console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)

  set(GlobalKeys.HANDLE, handle)
  set(GlobalKeys.STORE, store)

  if (!debugMode) {
    metrics()
  }
})
