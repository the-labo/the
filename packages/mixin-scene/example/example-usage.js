'use strict'

const { withBusy } = require('@the-/mixin-scene')
const { TheScene } = require('@the-/scene')

async function tryExample() {
  const MyScene = withBusy(
    class MySceneBase extends TheScene {
      async doSomething() {
        await this.busyWhile(async () => {
          /* ... */
        })
      }
    },
  )
  const scene = new MyScene()
  await scene.doSomething()
}

tryExample().catch((err) => console.error(err))
