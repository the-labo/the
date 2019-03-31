'use strict'

import c from 'classnames'
import { metaToPage } from 'clay-list-pager'
import numcal from 'numcal'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-component'

/**
 * Pager of the-components
 */
class ThePager extends React.PureComponent {
  static ByCounts({ className, counts, onChange, onUpdate, size = 5 }) {
    if (!counts) {
      return null
    }
    const { number, total } = metaToPage(counts)
    if (typeof total === 'undefined') {
      return null
    }
    if (total === 0) {
      return null
    }
    return (
      <ThePager
        className={c('the-pager-with-counts', className)}
        onChange={(e) => {
          onChange && onChange(e)
          onUpdate({ pageNumber: e.page + 1 })
        }}
        page={number - 1}
        size={size}
        total={total}
      />
    )
  }

  static Counts({ counts }) {
    if (!counts) {
      return null
    }
    const { limit, offset, total } = counts
    if (typeof total === 'undefined') {
      return null
    }
    if (total === 0) {
      return null
    }
    return (
      <div className='the-pager-counts'>
        <span className='the-pager-counts-from'>{offset + 1}</span>
        <span className='the-pager-counts-symbol'>-</span>
        <span className='the-pager-counts-to'>
          {Math.min(offset + limit, total)}
        </span>
        <span className='the-pager-counts-symbol'>/</span>
        <span className='the-pager-counts-of'>{total}</span>
      </div>
    )
  }

  static Item({
    children,
    className,
    disabled,
    href,
    onClick,
    selected,
    style,
    title,
  }) {
    return (
      <a
        className={c(
          'the-pager-item',
          {
            'the-pager-item-disabled': disabled,
            'the-pager-item-selected': selected,
          },
          className,
        )}
        href={href}
        onClick={disabled ? null : onClick}
        style={Object.assign({}, style)}
      >
        <span className='the-pager-item-inner'>
          {title}
          {children}
        </span>
      </a>
    )
  }

  static Row({ children, className }) {
    return <div className={c('the-pager-row', className)}>{children}</div>
  }

  render() {
    const { props } = this
    const { children, className } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-pager', className)}
      >
        {this.renderItems(props)}
        {children}
      </div>
    )
  }

  renderItems(props) {
    const { hrefPattern, onChange, page, size, total } = props
    const items = []

    const min = 0
    const max = total - 1
    const sizeHalf = parseInt(size / 2)

    const from = numcal.max(min, numcal.min(page - sizeHalf, max - size + 1))
    const to = numcal.min(numcal.max(min + size - 1, page + sizeHalf), max)

    const newItem = (index, title, enabled = true) => (
      <ThePager.Item
        data={index}
        disabled={!enabled}
        href={hrefPattern && hrefPattern.replace(':page', index)}
        key={[index, title].join('-')}
        onClick={() => onChange({ page: index })}
        selected={index === page}
        title={title}
      />
    )

    for (let index = from; index <= to; index++) {
      items.push(newItem(index, String(index + 1)))
    }

    items.unshift(newItem(page - 1, '«', min < page))
    items.push(newItem(page + 1, '»', page < to))

    return items
  }
}

ThePager.propTypes = {
  /** Pattern for href */
  hrefPattern: PropTypes.string,
  /** Handler for page change */
  onChange: PropTypes.func,
  /** Current page number. Start with 0 */
  page: PropTypes.number.isRequired,
  /** Number of items to show */
  size: PropTypes.number,
  /** Total page count */
  total: PropTypes.number.isRequired,
}

ThePager.defaultProps = {
  hrefPattern: null,
  size: 5,
}

ThePager.displayName = 'ThePager'

export default ThePager
