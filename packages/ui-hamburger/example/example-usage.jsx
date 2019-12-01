'use strict'

import React, { useState } from 'react'
import { TheHamburger } from '@the-/ui-hamburger'
import { TheHamburgerStyle } from '@the-/ui-hamburger/styles'
import { TheRouter } from '@the-/ui-router'

const ExampleComponent = () => {
  const [hidden, setHidden] = useState(false)
  const onToggle = () => setHidden(!hidden)
  return (
    <TheRouter.Hash>
      <div>
        <TheHamburgerStyle />
        <TheHamburger.Toggle onClick={onToggle} />
        <TheHamburger hidden={hidden} onToggle={onToggle}>
          <TheHamburger.Item to='#menu01'>Menu 01</TheHamburger.Item>
          <TheHamburger.Item to='#menu02'>Menu 02</TheHamburger.Item>
          <TheHamburger.Item to='#menu03'>Menu 03</TheHamburger.Item>
        </TheHamburger>
      </div>
    </TheRouter.Hash>
  )
}

export default ExampleComponent
