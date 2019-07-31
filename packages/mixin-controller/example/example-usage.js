'use strict'

const { TheCtrl } = require('@the-/controller')
const { withAuthorized } = require('@the-/mixin-controller')

async function tryExample() {
  class MyCtrl extends withAuthorized(TheCtrl) {
    async doSomething() {
      await this._assertAuthorized() // Inherit from withAuthorized
      /* ... */
    }
  }

  const ctrl = new MyCtrl()
  await ctrl.doSomething()
}

tryExample().catch((err) => console.error(err))
