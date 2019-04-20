'use strict'

import mount from '@the-/ui-demo/mount'
import ExampleComponent from '../../example/example-usage.jsx'

document.addEventListener('DOMContentLoaded', () => {
  mount(ExampleComponent, {}, () => {
    console.log('ExampleComponent mounted')
  })
})
