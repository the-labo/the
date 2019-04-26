'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeValues } from '@the-/const-ui'
import { TheStyle } from '@the-/ui-style'
import { colorWithAlpha } from '@the-/util-color'
import { asStyleData } from '@the-/util-ui'

/** Style for TheCalendar */
const TheCalendarStyle = ({ className, id, options }) => (
  <TheStyle
    {...{ id }}
    className={c('the-calendar-style', className)}
    styles={TheCalendarStyle.data(options)}
  />
)

TheCalendarStyle.displayName = 'TheCalendarStyle'
TheCalendarStyle.propTypes = {
  /** Style options */
  options: PropTypes.object,
}

TheCalendarStyle.defaultProps = {
  options: {},
}

TheCalendarStyle.data = (options) => {
  const { dominantColor = ThemeValues.dominantColor } = options
  return asStyleData({
    '.the-calendar': {
      '.rbc-abs-full,.rbc-row-bg': {
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      '.rbc-agenda-date-cell,.rbc-agenda-time-cell': {
        whiteSpace: 'nowrap',
      },
      '.rbc-agenda-event-cell': {
        width: '100%',
      },
      '.rbc-agenda-time-cell': {
        textTransform: 'lowercase',
      },
      '.rbc-agenda-time-cell .rbc-continues-after:after': {
        content: ' »',
      },
      '.rbc-agenda-time-cell .rbc-continues-prior:before': {
        content: '« ',
      },
      '.rbc-agenda-view': {
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
        overflow: 'auto',
      },
      '.rbc-agenda-view table.rbc-agenda-table': {
        border: '1px solid #DDD',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        width: '100%',
      },
      '.rbc-agenda-view table.rbc-agenda-table .rbc-agenda-time-cell': {
        paddingLeft: '15px',
        paddingRight: '15px',
        textTransform: 'lowercase',
      },
      '.rbc-agenda-view table.rbc-agenda-table tbody > tr + tr': {
        borderTop: '1px solid #DDD',
      },
      '.rbc-agenda-view table.rbc-agenda-table tbody > tr > td': {
        padding: '5px 10px',
        verticalAlign: 'top',
      },
      '.rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td': {
        borderLeft: '1px solid #DDD',
      },
      '.rbc-agenda-view table.rbc-agenda-table thead > tr > th': {
        borderBottom: '1px solid #DDD',
        padding: '3px 5px',
        textAlign: 'left',
      },
      '.rbc-btn': {
        color: 'inherit',
        font: 'inherit',
        margin: 0,
      },
      '.rbc-btn-group': {
        display: 'inline-block',
        whiteSpace: 'nowrap',
      },
      '.rbc-btn-group + .rbc-btn-group,.rbc-btn-group + button': {
        marginLeft: '10px',
      },
      '.rbc-btn-group > button:first-child:not(:last-child)': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      '.rbc-btn-group > button:last-child:not(:first-child)': {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
      },
      '.rbc-btn-group > button:not(:first-child):not(:last-child)': {
        borderRadius: '0',
      },
      '.rbc-btn-group button + button': {
        marginLeft: '-1px',
      },
      '.rbc-calendar': {
        alignItems: 'stretch',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      '.rbc-current-time-indicator': {
        backgroundColor: '#74ad31',
        height: '1px',
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 3,
      },
      '.rbc-date-cell': {
        flex: '1 1 0',
        minWidth: 0,
        paddingRight: '5px',
        textAlign: 'right',
      },
      '.rbc-date-cell > a,.rbc-date-cell > a:active,.rbc-date-cell > a:visited': {
        color: 'inherit',
        textDecoration: 'none',
      },
      '.rbc-date-cell.rbc-now': {
        fontWeight: 'bold',
      },
      '.rbc-day-bg': {
        flex: '100%',
      },
      '.rbc-day-bg + .rbc-day-bg': {
        borderLeft: '1px solid #DDD',
      },
      '.rbc-day-header': {
        textAlign: 'center',
      },
      '.rbc-day-slot': {
        position: 'relative',
      },
      '.rbc-day-slot .rbc-event': {
        alignItems: 'flex-start',
        border: '1px solid #265985',
        display: 'flex',
        flexFlow: 'column wrap',
        maxHeight: '100%',
        minHeight: '20px',
        overflow: 'hidden',
        position: 'absolute',
      },
      '.rbc-day-slot .rbc-event-content': {
        flex: '1 1 0',
        height: '100%',
        lineHeight: 1,
        minHeight: '1em',
        width: '100%',
        wordWrap: 'break-word',
      },
      '.rbc-day-slot .rbc-event-label': {
        flex: 'none',
        paddingRight: '5px',
        width: 'auto',
      },
      '.rbc-day-slot .rbc-events-container': {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: '10px',
        top: 0,
      },
      '.rbc-day-slot .rbc-events-container.rbc-is-rtl': {
        left: '10px',
        right: 0,
      },
      '.rbc-day-slot .rbc-time-slot': {
        borderTop: '1px solid #f7f7f7',
      },
      '.rbc-ellipsis,.rbc-event-label,.rbc-row-segment .rbc-event-content,.rbc-show-more': {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      '.rbc-event': {
        backgroundColor: dominantColor,
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 'smaller',
        maxWidth: '100%',
        padding: '0',
      },
      '.rbc-event-continues-after': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      '.rbc-event-continues-day-after': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      '.rbc-event-continues-day-prior': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
      '.rbc-event-continues-earlier': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
      '.rbc-event-continues-later': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      '.rbc-event-continues-prior': {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
      },
      '.rbc-event-label': {
        fontSize: '80%',
      },
      '.rbc-event-overlaps': {
        boxShadow: '-1px 1px 5px 0px rgba(51, 51, 51, 0.5)',
      },
      '.rbc-event.rbc-selected': {
        backgroundColor: dominantColor,
        outlineColor: dominantColor,
      },
      '.rbc-header': {
        borderBottom: '1px solid #DDD',
        flex: '100%',
        fontSize: '90%',
        fontWeight: 'bold',
        minHeight: 0,
        overflow: 'hidden',
        padding: '0 3px',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      },
      '.rbc-header + .rbc-header': {
        borderLeft: '1px solid #DDD',
      },
      '.rbc-header > a,.rbc-header > a:active,.rbc-header > a:visited': {
        color: 'inherit',
        textDecoration: 'none',
      },
      '.rbc-label': {
        padding: '0 5px',
      },
      '.rbc-month-header': {
        display: 'flex',
        flexDirection: 'row',
      },
      '.rbc-month-row': {
        display: 'flex',
        flex: '100',
        flexBasis: '0px',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      },
      '.rbc-month-row + .rbc-month-row': {
        borderTop: '1px solid #DDD',
      },
      '.rbc-month-view': {
        border: '1px solid #DDD',
        display: 'flex',
        flex: '100',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        userSelect: 'none',
        width: '100%',
      },
      '.rbc-off-range': {
        color: '#999999',
      },
      '.rbc-off-range-bg': {
        background: '#e5e5e5',
      },
      '.rbc-overlay': {
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.25)',
        padding: '10px',
        position: 'absolute',
        zIndex: 5,
      },
      '.rbc-overlay > * + *': {
        marginTop: '1px',
      },
      '.rbc-overlay-header': {
        borderBottom: '1px solid #e5e5e5',
        margin: '-10px -10px 5px -10px',
        padding: '2px 10px',
      },
      '.rbc-row': {
        display: 'flex',
        flexDirection: 'row',
      },
      '.rbc-row-bg': {
        display: 'flex',
        flex: '100',
        flexDirection: 'row',
        overflow: 'hidden',
      },
      '.rbc-row-content': {
        position: 'relative',
        userSelect: 'none',
        zIndex: 4,
      },
      '.rbc-row-segment': {
        boxSizing: 'border-box',
        padding: '0 1px 1px 1px',
      },
      '.rbc-rtl': {
        direction: 'rtl',
      },
      '.rbc-rtl .rbc-agenda-view table.rbc-agenda-table tbody > tr > td + td': {
        borderLeftWidth: 0,
        borderRight: '1px solid #DDD',
      },
      '.rbc-rtl .rbc-agenda-view table.rbc-agenda-table thead > tr > th': {
        textAlign: 'right',
      },
      '.rbc-rtl .rbc-btn-group > button:first-child:not(:last-child)': {
        borderBottomLeftRadius: 0,
        borderRadius: '4px',
        borderTopLeftRadius: 0,
      },
      '.rbc-rtl .rbc-btn-group > button:last-child:not(:first-child)': {
        borderBottomRightRadius: 0,
        borderRadius: '4px',
        borderTopRightRadius: 0,
      },
      '.rbc-rtl .rbc-btn-group button + button': {
        marginLeft: 0,
        marginRight: '-1px',
      },
      '.rbc-rtl .rbc-day-bg + .rbc-day-bg': {
        borderLeftWidth: 0,
        borderRight: '1px solid #DDD',
      },
      '.rbc-rtl .rbc-header + .rbc-header': {
        borderLeftWidth: 0,
        borderRight: '1px solid #DDD',
      },
      '.rbc-rtl .rbc-time-content > * + * > *': {
        borderLeftWidth: 0,
        borderRight: '1px solid #DDD',
      },
      '.rbc-rtl .rbc-time-header-content': {
        borderLeftWidth: 0,
        borderRight: '1px solid #DDD',
      },
      '.rbc-rtl .rbc-time-header.rbc-overflowing': {
        borderLeft: '1px solid #DDD',
        borderRightWidth: 0,
      },
      '.rbc-selected-cell': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
      '.rbc-show-more': {
        color: dominantColor,
        fontSize: 'small',
        fontWeight: 'bold',
        height: 'auto',
        lineHeight: 'normal',
        padding: '4px',
        whiteSpace: 'nowrap',
        zIndex: 4,
      },
      '.rbc-slot-selecting': {
        cursor: 'move',
      },
      '.rbc-slot-selecting .rbc-event': {
        cursor: 'inherit',
        pointerEvents: 'none',
      },
      '.rbc-slot-selection': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '75%',
        padding: '3px',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
      },
      '.rbc-time-column': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      },
      '.rbc-time-column .rbc-timeslot-group': {
        flex: 1,
      },
      '.rbc-time-content': {
        alignItems: 'flex-start',
        borderTop: '2px solid #DDD',
        display: 'flex',
        flex: '100%',
        overflowY: 'auto',
        position: 'relative',
        width: '100%',
      },
      '.rbc-time-content > .rbc-day-slot': {
        userSelect: 'none',
        width: '100%',
      },
      '.rbc-time-content > .rbc-time-gutter': {
        flex: 'none',
      },
      '.rbc-time-content > * + * > *': {
        borderLeft: '1px solid #DDD',
      },
      '.rbc-time-gutter,.rbc-header-gutter': {
        flex: 'none',
      },
      '.rbc-time-header': {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'row',
      },
      '.rbc-time-header > .rbc-row:first-child': {
        borderBottom: '1px solid #DDD',
      },
      '.rbc-time-header > .rbc-row.rbc-row-resource': {
        borderBottom: '1px solid #DDD',
      },
      '.rbc-time-header-content': {
        borderLeft: '1px solid #DDD',
        flex: 1,
        flexDirection: 'column',
        minWidth: 0,
      },
      '.rbc-time-header.rbc-overflowing': {
        borderRight: '1px solid #DDD',
      },
      '.rbc-time-slot': {
        flex: '1 0 0',
      },
      '.rbc-time-slot.rbc-now': {
        fontWeight: 'bold',
      },
      '.rbc-time-view': {
        border: '1px solid #DDD',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        minHeight: 0,
        width: '100%',
      },
      '.rbc-time-view .rbc-allday-cell': {
        boxSizing: 'content-box',
        position: 'relative',
        width: '100%',
      },
      '.rbc-time-view .rbc-allday-events': {
        position: 'relative',
        zIndex: 4,
      },
      '.rbc-time-view .rbc-row': {
        boxSizing: 'border-box',
        minHeight: '20px',
      },
      '.rbc-time-view .rbc-time-gutter': {
        whiteSpace: 'nowrap',
      },
      '.rbc-timeslot-group': {
        borderBottom: '1px solid #DDD',
        display: 'flex',
        flexFlow: 'column nowrap',
        minHeight: '40px',
      },
      '.rbc-today': {
        backgroundColor: colorWithAlpha(dominantColor, 0.1),
      },
      '.rbc-toolbar': {
        alignItems: 'center',
        display: 'flex',
        fontSize: '16px',
        marginBottom: '10px',
      },
      '.rbc-toolbar .rbc-toolbar-label': {
        flexGrow: 1,
        padding: '0 10px',
        textAlign: 'center',
      },
      '.rbc-toolbar button': {
        background: 'none',
        backgroundImage: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        color: '#373a3c',
        display: 'inline-block',
        lineHeight: 'normal',
        margin: 0,
        padding: '.375rem 1rem',
        textAlign: 'center',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      },
      '.rbc-toolbar button:active,.rbc-toolbar button.rbc-active': {
        backgroundColor: '#e6e6e6',
        backgroundImage: 'none',
        borderColor: '#adadad',
        boxShadow: 'inset 0 3px 5px rgba(0, 0, 0, 0.125)',
      },
      '.rbc-toolbar button:active:hover,.rbc-toolbar button.rbc-active:hover,.rbc-toolbar button:active:focus,.rbc-toolbar button.rbc-active:focus': {
        backgroundColor: '#d4d4d4',
        borderColor: '#8c8c8c',
        color: '#373a3c',
      },
      '.rbc-toolbar button:focus': {
        backgroundColor: '#e6e6e6',
        borderColor: '#adadad',
        color: '#373a3c',
      },
      '.rbc-toolbar button:hover': {
        backgroundColor: '#e6e6e6',
        borderColor: '#adadad',
        color: '#373a3c',
      },
      '.the-calendar-changer': {
        '&:active': {
          boxShadow: 'none',
          opacity: '0.8',
        },
        background: 'transparent',
        border: 'none',
        display: 'inline-flex',
        margin: '0',
        minHeight: '0',
        padding: '4px 8px',
      },
      '.the-calendar-changer-container': {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        fontWeight: 'normal',
        justifyContent: 'flex-start',
        margin: 0,
        width: '100%',
      },
      '.the-calendar-switcher': {
        '&:active': {
          opacity: '0.8',
        },
        '&:hover': {
          borderBottomColor: colorWithAlpha(dominantColor, 0.5),
        },
        '&:last-child': {},
        '&.the-calendar-switcher-selected': {
          borderBottomColor: dominantColor,
          cursor: 'default',
          zIndex: 4,
        },
        borderBottom: '1px solid transparent',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: 'xx-small',
        marginRight: '-1px',
        padding: '2px 4px',
        position: 'relative',
        textAlign: 'center',
        textDecoration: 'none',
      },
      '.the-calendar-switcher-container': {
        alignItems: 'center',
        borderRadius: '4px',
        display: 'inline-flex',
        justifyContent: 'space-between',
        margin: '4px 0',
      },
      '.the-calendar-title': {
        fontWeight: 'normal',
        margin: 0,
        padding: '0 4px',
        textAlign: 'center',
      },
      '.the-calendar-title-container': {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        fontWeight: 'normal',
        justifyContent: 'center',
        margin: 0,
        width: '100%',
      },
      '.the-calendar-toolbar': {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      },
      '.the-calendar-toolbar-col': {},
      '.the-calendar-toolbar-col-wide': {
        flexGrow: 1,
        width: '100%',
      },
      '&': {
        height: '280px',
      },
      'button.rbc-btn': {
        cursor: 'pointer',
        overflow: 'visible',
        textTransform: 'none',
      },
      'button[disabled].rbc-btn': {
        cursor: 'not-allowed',
      },
    },
    '.the-calendar-event': {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  })
}

export default TheCalendarStyle
