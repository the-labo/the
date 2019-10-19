'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheSection from './TheSection'

/**
 * Accordion section
 */
class TheAccordionSection extends React.Component {
  constructor(props) {
    super(props)
    this.innerRef = React.createRef()
    this.resizeTimer = null
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      maxHeight: '100%',
      open: props.open,
    }
  }

  componentDidMount() {
    this.resize()
    this.resizeTimer = setInterval(() => this.resize(), 500)
  }

  componentWillUnmount() {
    clearInterval(this.resizeTimer)
  }

  getInnerHeight() {
    const {
      innerRef: { current: inner },
    } = this
    return inner && inner.offsetHeight
  }

  handleToggle() {
    this.toggleOpen()
  }

  render() {
    const {
      props,
      props: { children, className, heading },
      state: { maxHeight, open },
    } = this

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
        <div className='the-accordion-section-inner' ref={this.innerRef}>
          <Header onClick={this.handleToggle} open={open}>
            {heading}
          </Header>
          <Body>{children}</Body>
        </div>
      </TheSection>
    )
  }

  resize() {
    const maxHeight = this.getInnerHeight()
    if (this.state.maxHeight !== maxHeight) {
      this.setState({ maxHeight })
    }
  }

  toggleOpen() {
    const open = !this.state.open
    this.setState({ open })
    const {
      props: { onToggle },
    } = this
    onToggle && onToggle(open)
  }
}

TheAccordionSection.Body = function Body(props) {
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

TheAccordionSection.Header = function Header(props) {
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
