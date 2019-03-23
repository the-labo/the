'use strict'

import ExampleComponent from '../../example/example-usage.jsx'
import mount from '../../../../../mount'

document.addEventListener('DOMContentLoaded', () => {
  mount(ExampleComponent, {}, () => {})
})
