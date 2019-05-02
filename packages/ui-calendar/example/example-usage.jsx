'use strict'

import React from 'react'
import { TheButtonStyle } from '@the-/ui-button'
import { TheCalendar, TheCalendarStyle } from '@the-/ui-calendar'

const events = [
  {
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    id: 1,
    node: <span>This is event01</span>,
    onSelect: (event) => {
      console.log('event01 selected!', event)
    },
    start: new Date(),
  },

  {
    end: new Date(new Date().getTime() + 25 * 60 * 60 * 1000),
    id: 2,
    node: <span>This is event02</span>,
    onSelect: (event) => {
      console.log('event02 selected!', event)
    },
    start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
]

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      view: 'month',
    }
  }

  render() {
    return (
      <div>
        <TheButtonStyle />
        <TheCalendarStyle />
        <TheCalendar
          date={this.state.date}
          events={events}
          onNavigate={(date) => this.setState({ date })}
          onView={(view) => this.setState({ view })}
          view={this.state.view}
        />
      </div>
    )
  }
}

export default ExampleComponent
