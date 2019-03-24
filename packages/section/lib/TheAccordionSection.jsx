'use strict'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheIcon } from 'the-icon'
import TheSection from './TheSection'

/**
 * Accordion section
 */
class TheAccordionSection extends React.Component {
  static Body(props) {
    let { children, className } = props
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

  static Header(props) {
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

  constructor(props) {
    super(props)
    this.inner = null
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
    const { inner } = this
    return inner && inner.offsetHeight
  }

  handleToggle() {
    this.toggleOpen()
  }

  render() {
    const { props, state } = this
    const { children, className, heading } = props
    const { maxHeight, open } = state
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
        <div
          className='the-accordion-section-inner'
          ref={(inner) => {
            this.inner = inner
          }}
        >
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
      this.setState({ maxHeight: maxHeight })
    }
  }

  toggleOpen() {
    const open = !this.state.open
    this.setState({ open })
    const { onToggle } = this.props
    onToggle && onToggle(open)
  }
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
