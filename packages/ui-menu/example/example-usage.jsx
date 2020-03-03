'use strict'

import React, { useCallback, useState } from 'react'
import { TheDropdownMenu, TheMenu } from '@the-/ui-menu'
import { TheMenuStyle } from '@the-/ui-menu/styles'
import { TheRouter } from '@the-/ui-router'

const StatefulDropdown = () => {
  const [open, setOpen] = useState(false)
  const onToggle = useCallback(
    (open) => {
      setOpen(open)
    },
    [setOpen],
  )
  return (
    <TheDropdownMenu
      label='Controlled dropdown'
      onToggle={onToggle}
      open={open}
    >
      <TheDropdownMenu.Item to='foo'>foo</TheDropdownMenu.Item>
      <TheDropdownMenu.Item to='bar'>bar</TheDropdownMenu.Item>
      <TheDropdownMenu.Item>baz</TheDropdownMenu.Item>
      <TheDropdownMenu.Item to='quz'>quz</TheDropdownMenu.Item>
      <TheDropdownMenu.Item>1</TheDropdownMenu.Item>
      <TheDropdownMenu.Item>2</TheDropdownMenu.Item>
      <TheDropdownMenu.Item>Long Long Long Long Long Text</TheDropdownMenu.Item>
      <TheDropdownMenu.Item onClick={() => setOpen(false)}>
        Click and close
      </TheDropdownMenu.Item>
    </TheDropdownMenu>
  )
}

const ExampleComponent = () => {
  const ExampleMenu = ({ grid = false }) => (
    <TheMenu grid={grid}>
      <TheMenu.Item icon='fa fa-support' text='Help' to='/help' />
      <TheMenu.Item icon='fa fa-info-circle' text='About' to='/about' />
      <TheMenu.Item
        icon='fa fa-sign-out'
        onClick={() => console.log('logout!')}
        text='Logout'
      />
      <TheMenu.Item icon='fa fa-sun-o' text='Foo' />
      <TheMenu.Item icon='fa fa-sun-o' text='Bar' />
      <TheMenu.Item icon='fa fa-sun-o' text='Baz' />
    </TheMenu>
  )
  return (
    <div>
      <TheRouter.Hash>
        <TheMenuStyle />

        <h3>Default Menu</h3>
        <div>
          <ExampleMenu />
        </div>

        <hr />

        <h3>Grid Menu</h3>
        <div>
          <ExampleMenu grid />
        </div>

        <hr />

        <h3>Drop Down</h3>

        <TheDropdownMenu label='Try me!'>
          <TheDropdownMenu.Item to='foo'>foo</TheDropdownMenu.Item>
          <TheDropdownMenu.Item to='bar'>bar</TheDropdownMenu.Item>
          <TheDropdownMenu.Item>baz</TheDropdownMenu.Item>
          <TheDropdownMenu.Item to='quz'>quz</TheDropdownMenu.Item>
          <TheDropdownMenu.Item>1</TheDropdownMenu.Item>
          <TheDropdownMenu.Item>2</TheDropdownMenu.Item>
          <TheDropdownMenu.Item>
            Long Long Long Long Long Text
          </TheDropdownMenu.Item>
        </TheDropdownMenu>

        <br />
        <br />
        <StatefulDropdown />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </TheRouter.Hash>
    </div>
  )
}

export default ExampleComponent
