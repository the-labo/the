'use strict'

import Hoge from 'mock-project-01'
import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  const hoge = React.createElement(Hoge, {})
  ReactDOM.render(hoge, document.getElementById('hoge-container'))
})
