'use strict'

import React from 'react'
import { TheDateInput, TheDateStyle } from '@the-/ui-date'

class ExampleComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        'value-date-01': '2018-08-01',
      },
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(values) {
    console.log('values', values)
    this.setState({
      values: Object.assign({}, this.state.values, values),
    })
  }

  render() {
    const {
      onUpdate,
      state: { values },
    } = this

    return (
      <div>
        <TheDateStyle />

        <h3>Date</h3>
        <TheDateInput
          minDate='2018-03-09'
          name='value-date-01'
          onUpdate={onUpdate}
          placeholder='date only'
          value={values['value-date-01'] || ''}
        />

        <TheDateInput
          minDate='2018-03-09'
          name='value-date-01'
          onUpdate={onUpdate}
          placeholder='date and time'
          timeEnabled
          value={values['value-date-01']}
        />

        <TheDateInput
          dateFormat='H:i'
          minDate='2018-03-09'
          name='value-date-01-time'
          noCalendar
          onUpdate={onUpdate}
          placeholder='time only'
          timeEnabled
          value={values['value-date-01-time']}
        />
      </div>
    )
  }
}

export default ExampleComponent
