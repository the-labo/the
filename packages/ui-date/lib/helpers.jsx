/**
 * @module @the-/ui.input.helpers
 */
'use strict'

import React from 'react'

export function renderErrorMessage(error) {
  if (!error) {
    return <span className='the-date-message the-date-message-empty' />
  }

  if (typeof error === 'string') {
    error = { message: error }
  }

  return (
    <span className='the-date-message the-date-error-message'>
      {error.message}
    </span>
  )
}
