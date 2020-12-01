'use strict'

import React, { useCallback, useState } from 'react'
import { TheDateInput } from '@the-/ui-date'
import { TheDateStyle } from '@the-/ui-date/styles'

const ExampleComponent = () => {
  const [values, setValues] = useState({
    'value-date-01': '2018-08-01',
  })
  const onUpdate = useCallback((newValues) => {
    console.log('values', newValues)
    setValues((prev) => Object.assign({}, prev, newValues))
  }, [])

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

export default ExampleComponent
