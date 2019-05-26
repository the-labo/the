'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { TheInput } from '@the-/ui-input'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheTableStyle from './TheTableStyle'

/**
 * Table for the-components
 */
class TheTable extends React.Component {
  static Body(props) {
    const { children, className } = props
    return (
      <tbody
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-body', className)}
        role='rowgroup'
      >
        {children}
      </tbody>
    )
  }

  static Cell(props) {
    const { children, className } = props
    return (
      <td
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-cell', className)}
        role='gridcell'
      >
        {children}
      </td>
    )
  }

  static CheckboxCell(props) {
    const { className, name, onUpdate, value } = props
    return (
      <TheTable.Cell
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-checkbox-cell', className)}
      >
        <TheInput.Checkbox
          className={c('the-table-checkbox')}
          name={name}
          onUpdate={onUpdate}
          options={[true]}
          role='checkbox'
          value={value}
        />
      </TheTable.Cell>
    )
  }

  static Foot(props) {
    const { children, className } = props
    return (
      <tfoot
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-foot', className)}
        role='rowgroup'
      >
        {children}
      </tfoot>
    )
  }

  static Head(props) {
    const { children, className } = props
    return (
      <thead
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-head', className)}
        role='rowgroup'
      >
        {children}
      </thead>
    )
  }

  static HeaderCell(props) {
    const { children, className, role = 'columnheader' } = props
    return (
      <th
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table-header-cell', className)}
        role={role}
      >
        {children}
      </th>
    )
  }

  static Row(props) {
    const { children, className, selected } = props
    return (
      <tr
        {...htmlAttributesFor(props, { except: ['className', 'selected'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c(className, 'the-table-row', {
          'the-table-row-selected': selected,
        })}
        role='row'
      >
        {children}
      </tr>
    )
  }

  static SortableHeaderCell(props) {
    const { children, className, name, onSort, sort } = props
    const asc = name === sort
    const desc = sort === `-${name}`
    return (
      <TheTable.HeaderCell
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        aria-sort={(asc && 'ascending') || (desc && 'descending') || 'none'}
        className={c('the-table-sortable-header-cell', className)}
      >
        <a onClick={() => onSort(name)} role='button'>
          {children}
          <TheIcon
            className={c({
              [TheTable.SORT_ASC_ICON]: asc,
              [TheTable.SORT_DESC_ICON]: desc,
              [TheTable.SORT_ICON]: !asc && !desc,
            })}
          />
        </a>
      </TheTable.HeaderCell>
    )
  }

  render() {
    const {
      props,
      props: { alt, children, className, empty, wide },
    } = this

    const Component = empty ? 'div' : 'table'
    return (
      <Component
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-table', className, {
          'the-table-empty': empty,
          'the-table-wide': wide,
        })}
      >
        {empty ? <p className='the-table-alt-cell'>{alt}</p> : children}
      </Component>
    )
  }
}

TheTable.SORT_ICON = 'fas fa-sort'
TheTable.SORT_DESC_ICON = 'fas fa-sort-down'
TheTable.SORT_ASC_ICON = 'fas fa-sort-up'

TheTable.Style = TheTableStyle

TheTable.propTypes = {
  /** Alt for empty */
  alt: PropTypes.node,
  /** Show as empty */
  empty: PropTypes.bool,
  /** Show as wide */
  width: PropTypes.bool,
}

TheTable.defaultProps = {
  alt: 'Data Not found',
  empty: false,
  role: 'grid',
  wide: false,
}

TheTable.displayName = 'TheTable'

export default TheTable
