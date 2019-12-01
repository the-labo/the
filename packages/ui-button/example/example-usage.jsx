'use strict'

import React, { useCallback } from 'react'
import { TheButton, TheButtonGroup } from '@the-/ui-button'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheRouter } from '@the-/ui-router'

const ExampleComponent = () => {
  const handleClick = useCallback((e) => {
    console.log('clicked!', e)
  }, [])
  return (
    <div>
      <TheRouter.Hash>
        <TheButtonStyle />
        <TheButton onClick={handleClick}>Normal Button</TheButton>
        <TheButton onClick={handleClick} primary>
          Primary Button
        </TheButton>
        <TheButton disabled onClick={handleClick}>
          Disabled Button
        </TheButton>
        <TheButton onClick={handleClick} spinning>
          Spinning Button
        </TheButton>
        <TheButton light onClick={handleClick}>
          Light Button
        </TheButton>
        <TheButton onClick={handleClick} simple>
          Simple Button
        </TheButton>
        <TheButton danger onClick={handleClick}>
          Danger Button
        </TheButton>
        <TheButton onClick={handleClick} wide>
          Wide Button
        </TheButton>
        <TheButton large onClick={handleClick}>
          Large Button
        </TheButton>
        <TheButton onClick={handleClick} rounded>
          Rounded Button
        </TheButton>
        <TheButton icon='fa fa-car' onClick={handleClick} rounded>
          Rounded icon Button
        </TheButton>
        <TheButton onClick={handleClick} rounded spinning>
          Rounded Spinning Button
        </TheButton>
        <TheButton color='#83E' onClick={handleClick}>
          Color Button
        </TheButton>
        <TheButton color='#83E' onClick={handleClick} primary>
          Color Primary Button
        </TheButton>
        <TheButton color='#FFA' onClick={handleClick} primary>
          Color Primary Button2
        </TheButton>
        <TheButton floated onClick={handleClick} rounded>
          Round Float Button
        </TheButton>
        <TheButton to='/whatever'>Nav Button</TheButton>
        <TheButton.Prev to='#'>Go Left</TheButton.Prev>
        <TheButton.Next to='#'>Go Right</TheButton.Next>
        <TheButton icon='fa fa-car' text='Icon button' />
        <TheButton largeIcon='fa fa-car' text='Large Icon button' />
        <hr />

        <TheButtonGroup>
          <TheButton onClick={handleClick}>Grouped Button 01</TheButton>
          <TheButton onClick={handleClick}>Grouped Button 02</TheButton>
        </TheButtonGroup>

        <br />

        <TheButtonGroup collapsed>
          <TheButton onClick={handleClick}>Grouped Button 03</TheButton>
          <TheButton onClick={handleClick}>Grouped Button 04</TheButton>
          <TheButton onClick={handleClick}>Grouped Button 05</TheButton>
        </TheButtonGroup>
      </TheRouter.Hash>
    </div>
  )
}

export default ExampleComponent
