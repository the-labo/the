'use strict'

import c from 'classnames'
import React from 'react'

export default function TheInputTextOptions({
  candidates,
  onSelect,
  parser,
  selectedCandidate,
}) {
  if (candidates.length === 0) {
    return null
  }

  return (
    <ul className='the-input-text-options' role='listbox'>
      {candidates.map((candidate) => (
        <li
          aria-label={candidate}
          className={c('the-input-text-option', {
            'the-input-text-option-selected': selectedCandidate === candidate,
          })}
          data-value={parser(candidate)}
          key={candidate}
          onClick={() => onSelect({ value: candidate })}
          role='option'
        >
          {candidate}
        </li>
      ))}
    </ul>
  )
}
