'use strict'

import React from 'react'
import { TheRouter } from '@the-/router'
import { TheRoute } from '@the-/route'
import { TheHeader, TheHeaderStyle } from '@the-/ui-header'
import { TheButton, TheButtonStyle } from '@the-/button'

class ExampleComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      notice: true
    }
  }

  render () {
    const {MockPage} = ExampleComponent
    const {Logo, Tab, TabItem, RightArea} = TheHeader
    return (
      <div>
        <TheRouter.Hash>
          <TheHeaderStyle/>
          <TheButtonStyle/>
          <TheHeader notices={this.state.notice ? {
            'you needs to verify your email': {
              'send again': () => this.setState({notice: false})
            }
          } : {}}>
            <Logo>Some app</Logo>
            <Tab>
              <TabItem to='/page-a'>PageA</TabItem>
              <TabItem to='/page-b'>PageB</TabItem>
            </Tab>
            <RightArea>
              <TheButton>Login</TheButton>
              <TheButton primary>Sign Up</TheButton>
            </RightArea>
          </TheHeader>
          <div>
            <MockPage path='/page-a'
                      color='#83A'
                      message='This is Page A'
            />
            <MockPage path='/page-b'
                      color='#38A'
                      message='This is Page B'
            />

            <hr/>

            <TheHeader asOverlay
                       style={{top: 190}}
            >
              <Logo>Some app with overlay header</Logo>
              <Tab>
                <TabItem to='/page-a'>PageA</TabItem>
                <TabItem to='/page-b'>PageB</TabItem>
                <TabItem to='/page-b' icon='fa fa-search'/>
              </Tab>
              <RightArea>
                <TheButton>Login</TheButton>
                <TheButton primary>Sign Up</TheButton>
              </RightArea>
            </TheHeader>

            <hr/>


            <TheHeader asOverlay
                       reversed
                       ribbon={'This is a ribbon'}
                       style={{top: 400}}
            >
              <Logo>Some app with overlay header</Logo>
              <Tab>
                <TabItem to='/page-a'>PageA</TabItem>
                <TabItem to='/page-b'>PageB</TabItem>
                <TabItem to='/page-b' icon='fa fa-search'/>
              </Tab>
              <RightArea>
                <TheButton>Login</TheButton>
                <TheButton primary>Sign Up</TheButton>
              </RightArea>
            </TheHeader>


            <br/>
            <TheHeader asStatic>
              <Logo>Some app with static header</Logo>
            </TheHeader>
          </div>
        </TheRouter.Hash>
      </div>
    )
  }

  static MockPage ({path, color, message}) {
    return (
      <TheRoute path={path}
                component={({}) => (
                  <div style={{color}}>
                    {message}
                  </div>
                )}
      >

      </TheRoute>
    )
  }
}

export default ExampleComponent
