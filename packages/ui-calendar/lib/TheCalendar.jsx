'use strict'

import c from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import BigCalendar from 'react-big-calendar'
import theDate from '@the-/date'
import { TheButton } from '@the-/ui-button'
import { TheCondition } from '@the-/ui-condition'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

const localizer = BigCalendar.momentLocalizer(moment)

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
  event: class TheCalendarEvent extends React.Component {
    render() {
      const {
        event: { id, node = null },
        title,
      } = this.props
      return (
        <div className='the-calendar-event' data-calendar-event-id={id}>
          {title}
          {node}
        </div>
      )
    }
  },
}

/**
 * Calendar of the-components
 */
class TheCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleMonthView = this.handleMonthView.bind(this)
    this.handleWeekView = this.handleWeekView.bind(this)
    this.handleDayView = this.handleDayView.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleEventSelect = this.handleEventSelect.bind(this)
  }

  get title() {
    const { date, lang, view } = this.props
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
  }

  changeDate(amount) {
    this.changeToDate(this.dateForAmount(amount))
  }

  changeToDate(date) {
    this.props.onNavigate(date)
  }

  changeToView(view) {
    this.props.onView(view)
  }

  dateForAmount(amount) {
    const { date, view } = this.props
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
  }

  handleDayView() {
    this.changeToView('day')
  }

  handleEventSelect(selected) {
    const { events } = this.props
    for (const event of events) {
      const { id, onSelect } = event
      const hit = id === selected.id || event === selected
      if (hit) {
        onSelect && onSelect(event)
      }
    }
  }

  handleMonthView() {
    this.changeToView('month')
  }

  handleNext() {
    this.changeDate(+1)
  }

  handlePrev() {
    this.changeDate(-1)
  }

  handleWeekView() {
    this.changeToView('week')
  }

  render() {
    const { props } = this
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
    const switcherLabels = SwitcherLabels[lang] || SwitcherLabels['en']
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
                onClick={this.handlePrev}
              />
              <TheButton
                className={changerClass()}
                icon={TheCalendar.NEXT_ICON}
                onClick={this.handleNext}
              />
            </div>
          </div>
          <div className='the-calendar-toolbar-col the-calendar-toolbar-col-wide'>
            <div className='the-calendar-title-container'>
              <h3 className='the-calendar-title'>{this.title}</h3>
            </div>
          </div>
          <div className='the-calendar-toolbar-col'>
            <div className='the-calendar-switcher-container'>
              <TheCondition if={views.includes('month')}>
                <a
                  className={switcherClass({ selected: view === 'month' })}
                  onClick={this.handleMonthView}
                >
                  {switcherLabels[0]}
                </a>
              </TheCondition>
              <TheCondition if={views.includes('week')}>
                <a
                  className={switcherClass({ selected: view === 'week' })}
                  onClick={this.handleWeekView}
                >
                  {switcherLabels[1]}
                </a>
              </TheCondition>
              <TheCondition if={views.includes('day')}>
                <a
                  className={switcherClass({ selected: view === 'day' })}
                  onClick={this.handleDayView}
                >
                  {switcherLabels[2]}
                </a>
              </TheCondition>
            </div>
          </div>
        </div>
        <BigCalendar
          {...{
            components,
            date,
            events,
            localizer,
            onNavigate,
            onView,
            view,
            views,
          }}
          culture={lang}
          onEvrn
          onSelectEvent={this.handleEventSelect}
          toolbar={false}
        />
      </div>
    )
  }
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
