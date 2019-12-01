'use strict'

import React, { useState } from 'react'
import { TheButtonStyle } from '@the-/ui-button/styles'
import { TheCalendar } from '@the-/ui-calendar'
import { TheCalendarStyle } from '@the-/ui-calendar/styles'

const events = [
  {
    end: new Date(new Date().getTime() + 3600000),
    id: 1,
    node: <span>This is event01</span>,
    onSelect: (event) => {
      console.log('event01 selected!', event)
    },
    start: new Date(),
  },

  {
    end: new Date(new Date().getTime() + 90000000),
    id: 2,
    node: <span>This is event02</span>,
    onSelect: (event) => {
      console.log('event02 selected!', event)
    },
    start: new Date(new Date().getTime() + 86400000),
  },
]

const ExampleComponent = () => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')
  return (
    <div>
      <TheButtonStyle />
      <TheCalendarStyle />
      <TheCalendar
        date={date}
        events={events}
        onNavigate={(date) => setDate(date)}
        onView={(view) => setView(view)}
        view={view}
      />
    </div>
  )
}

export default ExampleComponent
