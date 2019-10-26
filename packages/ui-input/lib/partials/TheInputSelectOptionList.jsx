'use strict'

import c from 'classnames'
import React from 'react'
import TheInputSelectOptionListItem from './TheInputSelectOptionListItem'

export default React.memo(function TheInputSelectOptionList(props) {
  const {
    disabledValues,
    full = false,
    nullable = false,
    nullText,
    onClose,
    onNull,
    onSelect,
    options,
    optionsRef,
    parser,
    sorter,
    suggestingIndex,
  } = props
  const optionValues = Object.keys(options)
  if (optionValues.length === 0) {
    return null
  }

  return (
    <div
      className={c('the-input-select-options', {
        'the-input-select-options-full': full,
      })}
      ref={optionsRef}
    >
      <div className='the-input-select-options-back' onClick={onClose} />
      <ul className='the-input-select-options-list' role='listbox'>
        {nullable && (
          <li className={c('the-input-select-option')} onClick={onNull}>
            {nullText || ''}
          </li>
        )}
        {optionValues.sort(sorter).map((optionValue, i) => (
          <TheInputSelectOptionListItem
            disabled={disabledValues.includes(optionValue)}
            key={optionValue}
            onSelect={onSelect}
            role='option'
            selected={i === suggestingIndex}
            value={parser(optionValue)}
          >
            {options[optionValue]}
          </TheInputSelectOptionListItem>
        ))}
      </ul>
    </div>
  )
})
