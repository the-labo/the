'use strict'

import React from 'react'
import { TheRouter } from '@the-/router'
import { TheSpinStyle } from '@the-/spin'
import { TheLink } from '@the-/link'
import { TheRoute, TheRouteStack, TheRouteStyle } from '@the-/ui-route'

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {i: 0, vertical: false}

    setInterval(() => {
      // this.setState({i: this.state.i + 1})
    }, 1000)
  }

  render () {
    return (
      <div>
        <TheSpinStyle/>
        <TheRouteStyle/>

        <br/>
        <TheRouter.Hash>
          <TheLink exact to={'/s1'}>Show Stack</TheLink>
          <TheLink exact to={'/'}>Hide Stack</TheLink>
          <a onClick={() => this.setState({vertical: !this.state.vertical})}>
            Change direction
          </a>
          <TheRoute.Switch>
            <TheRoute path='/s1'
            >
              <TheRouteStack style={{border: '4px solid #555'}}
                             direction={this.state.vertical ? 'vertical' : 'horizontal'}
                             stack={[
                               ['/s1', class View01 extends React.Component {
                                 render () {
                                   return (
                                     <div style={{padding: '50px', background: '#EAA'}}>
                                       <h3>This is view 01</h3>

                                       <br/>
                                       <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                         <span> </span>
                                         <TheLink to={'/s1/v2'}>Go to view 02 &gt;&gt; </TheLink>
                                       </div>
                                     </div>
                                   )
                                 }

                                 componentDidMount () {
                                   console.log('View01 did mount')
                                 }
                               }],
                               ['/s1/v2', class View02 extends React.Component {
                                 render () {
                                   const {pop} = this.props
                                   return (
                                     <div style={{padding: '50px', background: '#AEA', height: 920}}>
                                       <h3>This is view 02</h3>
                                       <br/>

                                       <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                         <a onClick={() => pop()}> &lt;&lt; Back to view 01</a>
                                         <TheLink to={'/s1/v2/v3'}>Go to view 03 &gt;&gt; </TheLink>
                                       </div>
                                     </div>
                                   )
                                 }

                                 componentDidMount () {
                                   console.log('View02 did mount')
                                 }
                               }],
                               ['/s1/v2/v3', class View03 extends React.Component {
                                 render () {
                                   const {pop} = this.props
                                   return (
                                     <div style={{padding: '50px', background: '#AAE'}}>
                                       <h3>This is view 03</h3>
                                       <br/>
                                       <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                         <a onClick={() => pop()}> &lt;&lt; Back to view 02</a>
                                         <span></span>
                                       </div>
                                     </div>
                                   )
                                 }

                                 componentDidMount () {
                                   console.log('View03 did mount')
                                   const {location, history} = this.props
                                   history.replace(location.pathname + '?a=b')
                                 }
                               }]
                             ]}>
              </TheRouteStack>
            </TheRoute>
          </TheRoute.Switch>
          <br/>
          <hr/>
          <br/>
          <h3>404</h3>
          <TheRoute.Status code="404">
            <div>Page not found!</div>
          </TheRoute.Status>
        </TheRouter.Hash>


      </div>
    )
  }
}

export default ExampleComponent
