'use strict'

const {withBusy} = require('@the-/mixin-scene')
const {TheScene} = require('@the-/scene')

async function tryExample () {
  const MyScene = withBusy(
    class MySceneBase extends TheScene {
    }
  )
}

tryExample().catch((err) => console.error(err))
