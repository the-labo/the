'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheSection from './TheSection'

/**
 * Accordion section
 */
const TheAccordionSection = (props) => {
  const { children, className, heading, onToggle } = props
  const [maxHeight, setMaxHeight] = useState('100%')
  const [open, setOpen] = useState(props.open)
  const innerRef = useRef(null)

  const getInnerHeight = useCallback(() => {
    const { current: inner } = innerRef
    return inner && inner.offsetHeight
  }, [innerRef])

  const resize = useCallback(() => {
    setMaxHeight(getInnerHeight())
  }, [maxHeight, getInnerHeight])

  useEffect(() => {
    const timer = setInterval(() => resize(), 500)
    resize()
    return () => clearInterval(timer)
  }, [])

  const toggleOpen = useCallback(() => {
    const newOpen = !open
    setOpen(newOpen)
    onToggle && onToggle(newOpen)
  }, [open, onToggle])

  const handleToggle = useCallback(() => toggleOpen())

  const { Body, Header } = TheAccordionSection
  return (
    <TheSection
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      aria-expanded={open}
      className={classnames('the-accordion-section', className, {
        'the-accordion-section-closed': !open,
        'the-accordion-section-open': open,
      })}
      style={{ maxHeight }}
    >
      <div className='the-accordion-section-inner' ref={innerRef}>
        <Header onClick={handleToggle} open={open}>
          {heading}
        </Header>
        <Body>{children}</Body>
      </div>
    </TheSection>
  )
}

TheAccordionSection.Body = function TheAccordionSectionBody(props) {
  const { children, className } = props
  return (
    <TheSection.Body
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-accordion-section-body', className)}
    >
      {children}
    </TheSection.Body>
  )
}

TheAccordionSection.Header = function TheAccordionSectionHeader(props) {
  const { children, className } = props
  return (
    <TheSection.Header
      {...htmlAttributesFor(props, { except: ['className'] })}
      {...eventHandlersFor(props, { except: [] })}
      className={classnames('the-accordion-section-header', className)}
    >
      <TheIcon
        className={classnames(
          'the-accordion-header-icon',
          TheAccordionSection.UP_ICON,
        )}
      />
      <span className='the-accordion-header-children'>{children}</span>
    </TheSection.Header>
  )
}

TheAccordionSection.UP_ICON = 'fas fa-angle-up'

TheAccordionSection.propTypes = {
  /** Heading component */
  heading: PropTypes.node.isRequired,
  /** Callback when toggle */
  onToggle: PropTypes.func,
  /** Open  when mounted */
  open: PropTypes.bool,
}

TheAccordionSection.defaultProps = {
  onToggle: () => null,
  open: false,
}

TheAccordionSection.displayName = 'TheAccordionSection'

export default TheAccordionSection
