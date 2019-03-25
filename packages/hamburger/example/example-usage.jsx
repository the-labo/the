'use strict'

import React from 'react'
import { TheHamburger, TheHamburgerStyle } from '@the-/hamburger'
import { TheRouter } from '@the-/router'

class ExampleComponent extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      hidden: false,
    }
  }

  render () {
    const onToggle = () => this.setState({hidden: !this.state.hidden})
    const {hidden} = this.state
    return (
      <TheRouter.Hash>
        <div>
          <TheHamburgerStyle/>
          <TheHamburger.Toggle onClick={onToggle}/>
          <TheHamburger hidden={hidden}
                        onToggle={onToggle}
          >
            <TheHamburger.Item to={'#menu01'}>Menu 01</TheHamburger.Item>
            <TheHamburger.Item to={'#menu02'}>Menu 02</TheHamburger.Item>
            <TheHamburger.Item to={'#menu03'}>Menu 03</TheHamburger.Item>
          </TheHamburger>
        </div>
      </TheRouter.Hash>
    )
  }
}

export default ExampleComponent
