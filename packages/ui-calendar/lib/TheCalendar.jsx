'use strict'

import c from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import theDate from '@the-/date'
import { TheButton } from '@the-/ui-button'
import { TheCondition } from '@the-/ui-condition'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

const localizer = momentLocalizer(moment)

const SwitcherLabels = {
  en: ['Month', 'Week', 'Day'],
  ja: ['月', '週', '日'],
}

const switcherClass = ({ selected }) =>
  c('the-calendar-switcher', {
    'the-calendar-switcher-selected': selected,
  })

const changerClass = () => c('the-calendar-changer', {})

const components = {
  event: function TheCalendarEvent({ event: { id, node = null }, title }) {
    return (
      <div className='the-calendar-event' data-calendar-event-id={id}>
        {title}
        {node}
      </div>
    )
  },
}

/**
 * Calendar of the-components
 */
const TheCalendar = (props) => {
  const {
    className,
    date,
    events,
    lang,
    onNavigate,
    onView,
    view,
    views,
  } = props
  const title = useMemo(() => {
    switch (view) {
      case 'day':
        return theDate(date, { lang }).format('LL')
      case 'month': {
        const format = lang === 'ja' ? 'YYYY/MM' : 'MMM YYYY'
        return theDate(date, { lang }).format(format)
      }
      default:
        return null
    }
  }, [date, lang, view])

  const dateForAmount = useCallback(
    (amount) => {
      switch (view) {
        case 'day':
          return theDate(date)
            .addDays(amount)
            .toDate()
        case 'month':
          return theDate(date)
            .addMonths(amount)
            .toDate()
        case 'week':
          return theDate(date)
            .addWeeks(amount)
            .toDate()
        default:
          throw new Error(`Unknown view: ${view}`)
      }
    },
    [date, view],
  )

  const changeToDate = useCallback(
    (date) => {
      onNavigate(date)
    },
    [onNavigate],
  )

  const changeDate = useCallback(
    (amount) => {
      changeToDate(dateForAmount(amount))
    },
    [changeToDate, dateForAmount],
  )

  const changeToView = useCallback(
    (view) => {
      onView(view)
    },
    [onView],
  )

  const handleDayView = useCallback(() => {
    changeToView('day')
  }, [])

  const handleEventSelect = useCallback(
    (selected) => {
      for (const event of events) {
        const { id, onSelect } = event
        const hit = id === selected.id || event === selected
        if (hit) {
          onSelect && onSelect(event)
        }
      }
    },
    [events],
  )

  const handleMonthView = useCallback(() => {
    changeToView('month')
  }, [changeToView])

  const handleNext = useCallback(() => {
    changeDate(+1)
  }, [changeDate])

  const handlePrev = useCallback(() => {
    changeDate(-1)
  }, [changeDate])

  const handleWeekView = useCallback(() => {
    changeToView('week')
  }, [changeToView])

  const switcherLabels = SwitcherLabels[lang] || SwitcherLabels.en
  return (
    <div
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={c('the-calendar', className)}
    >
      <div className='the-calendar-toolbar'>
        <div className='the-calendar-toolbar-col'>
          <div className='the-calendar-changer-container'>
            <TheButton
              className={changerClass()}
              icon={TheCalendar.PREV_ICON}
              onClick={handlePrev}
            />
            <TheButton
              className={changerClass()}
              icon={TheCalendar.NEXT_ICON}
              onClick={handleNext}
            />
          </div>
        </div>
        <div className='the-calendar-toolbar-col the-calendar-toolbar-col-wide'>
          <div className='the-calendar-title-container'>
            <h3 className='the-calendar-title'>{title}</h3>
          </div>
        </div>
        <div className='the-calendar-toolbar-col'>
          <div className='the-calendar-switcher-container'>
            <TheCondition if={views.includes('month')}>
              <a
                className={switcherClass({ selected: view === 'month' })}
                onClick={handleMonthView}
              >
                {switcherLabels[0]}
              </a>
            </TheCondition>
            <TheCondition if={views.includes('week')}>
              <a
                className={switcherClass({ selected: view === 'week' })}
                onClick={handleWeekView}
              >
                {switcherLabels[1]}
              </a>
            </TheCondition>
            <TheCondition if={views.includes('day')}>
              <a
                className={switcherClass({ selected: view === 'day' })}
                onClick={handleDayView}
              >
                {switcherLabels[2]}
              </a>
            </TheCondition>
          </div>
        </div>
      </div>
      <BigCalendar
        components={components}
        culture={lang}
        date={date}
        events={events}
        localizer={localizer}
        onEvrn
        onNavigate={onNavigate}
        onSelectEvent={handleEventSelect}
        onView={onView}
        toolbar={false}
        view={view}
        views={views}
      />
    </div>
  )
}

TheCalendar.NEXT_ICON = 'fas fa-caret-right'
TheCalendar.PREV_ICON = 'fas fa-caret-left'

TheCalendar.propTypes = {
  /** Showing date object */
  date: PropTypes.object,
  /** Events to show */
  events: PropTypes.arrayOf(PropTypes.object),
  /** Lang */
  lang: PropTypes.string,
  /** Navigate to date */
  onNavigate: PropTypes.func.isRequired,
  /** Change view */
  onView: PropTypes.func.isRequired,
  /** View of calendar */
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string),
}

TheCalendar.defaultProps = {
  events: [],
  lang: 'en',
  onNavigate: null,
  onView: null,
  toolbar: false,
  view: 'month',
  views: ['month', 'day'],
}

TheCalendar.displayName = 'TheCalendar'

export default TheCalendar
