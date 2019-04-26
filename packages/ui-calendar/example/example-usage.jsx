'use strict'

import React from 'react'
import { TheCalendar, TheCalendarStyle } from '@the-/ui-calendar'
import { TheButtonStyle } from '@the-/ui-button'

const events = [
  {
    id: 1,
    node: <span>This is event01</span>,
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    onSelect: (event) => {
      console.log('event01 selected!', event)
    }
  },

  {
    id: 2,
    node: <span>This is event02</span>,
    start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    end: new Date(new Date().getTime() + 25 * 60 * 60 * 1000),
    onSelect: (event) => {
      console.log('event02 selected!', event)
    }
  }
]

class ExampleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'month',
      date: new Date(),
    }
  }

  render () {
    return (
      <div>
        <TheButtonStyle/>
        <TheCalendarStyle/>
        <TheCalendar onNavigate={(date) => this.setState({ date })}
                     onView={(view) => this.setState({ view })}
                     date={this.state.date}
                     view={this.state.view}
                     events={events}
        >
        </TheCalendar>
      </div>

    )
  }
}

export default ExampleComponent
