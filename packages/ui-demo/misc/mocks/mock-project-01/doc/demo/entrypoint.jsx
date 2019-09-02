'use strict'

import ExampleComponent from '../../example/example-usage'
import mount from '../../../../../mount'

document.addEventListener('DOMContentLoaded', () => {
  mount(ExampleComponent, {}, () => {})
})
