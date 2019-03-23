'use strict'

import React from 'react'
import { TheButton, TheButtonGroup, TheButtonStyle } from '@the-/button'
import { TheRouter } from 'the-router'

class ExampleComponent extends React.PureComponent {
  handleClick = (e) => {
    console.log('clicked!', e)
  }

  render () {
    const { handleClick } = this
    return (
      <div>
        <TheRouter.Hash>
          <TheButtonStyle/>
          <TheButton onClick={handleClick}>Normal Button</TheButton>
          <TheButton primary onClick={handleClick}>Primary Button</TheButton>
          <TheButton disabled onClick={handleClick}>Disabled Button</TheButton>
          <TheButton spinning onClick={handleClick}>Spinning Button</TheButton>
          <TheButton light onClick={handleClick}>Light Button</TheButton>
          <TheButton simple onClick={handleClick}>Simple Button</TheButton>
          <TheButton danger onClick={handleClick}>Danger Button</TheButton>
          <TheButton wide onClick={handleClick}>Wide Button</TheButton>
          <TheButton large onClick={handleClick}>Large Button</TheButton>
          <TheButton rounded onClick={handleClick}>Rounded Button</TheButton>
          <TheButton rounded icon='fa fa-car' onClick={handleClick}>Rounded icon Button</TheButton>
          <TheButton rounded spinning onClick={handleClick}>Rounded Spinning Button</TheButton>
          <TheButton color='#83E' onClick={handleClick}>Color Button</TheButton>
          <TheButton color='#83E' primary onClick={handleClick}>Color Primary Button</TheButton>
          <TheButton color='#FFA' primary onClick={handleClick}>Color Primary Button2</TheButton>
          <TheButton rounded floated onClick={handleClick}>Round Float Button</TheButton>
          <TheButton to='/whatever'>Nav Button</TheButton>
          <TheButton.Prev to='#'>Go Left</TheButton.Prev>
          <TheButton.Next to='#'>Go Right</TheButton.Next>
          <TheButton icon='fa fa-car' text='Icon button'/>
          <TheButton largeIcon='fa fa-car' text='Large Icon button'/>
          <hr/>


          <TheButtonGroup>
            <TheButton onClick={handleClick}>Grouped Button 01</TheButton>
            <TheButton onClick={handleClick}>Grouped Button 02</TheButton>
          </TheButtonGroup>

          <br/>

          <TheButtonGroup collapsed>
            <TheButton onClick={handleClick}>Grouped Button 03</TheButton>
            <TheButton onClick={handleClick}>Grouped Button 04</TheButton>
            <TheButton onClick={handleClick}>Grouped Button 05</TheButton>
          </TheButtonGroup>

        </TheRouter.Hash>
      </div>

    )
  }
}

export default ExampleComponent
