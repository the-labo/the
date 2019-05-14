'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { TheIcon } from '@the-/ui-icon'
import { changedProps } from '@the-/util-ui'

class TheStepBar extends React.Component {
  constructor(props) {
    super(props)
    this.elmRef = React.createRef()
  }
  componentDidUpdate(prevProps) {
    const diff = changedProps(prevProps, this.props)
    if ('step' in diff) {
      this.scrollToStep(diff.step)
    }
  }

  render() {
    const { nodes, onStep, step } = this.props

    return (
      <div className={c('the-step-bar')} ref={this.elmRef} role='tablist'>
        {nodes.map((node, index) => (
          <TheStepBar.Item key={index} {...{ index, node, onStep, step }} />
        ))}
      </div>
    )
  }

  scrollToStep(step) {
    const elm = this.elmRef.current
    if (!elm) {
      return
    }
    const child = (elm.childNodes || [])[step]
    if (!child) {
      return
    }
    const center = child.offsetLeft + child.offsetWidth / 2
    elm.scrollLeft = center - elm.offsetWidth / 2
  }
}

class TheStepBarItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleStep = this.handleStep.bind(this)
  }

  handleStep() {
    const { index, onStep } = this.props
    onStep && onStep(index)
  }

  render() {
    const { index, node, step } = this.props
    const done = index < step
    const current = index === step
    const active = done || current
    const link = active || index === step + 1
    return (
      <a
        className={c('the-step-bar-item', {
          'the-step-bar-item-active': active,
          'the-step-bar-item-current': current,
          'the-step-bar-item-done': done,
          'the-step-bar-item-link': link,
        })}
        onClick={link ? this.handleStep : null}
        role='tab'
      >
        <div className='the-step-bar-item-shape'>
          <h3 className='the-step-bar-item-num'>
            {done ? <TheIcon className={TheStepBar.DONE_ICON} /> : index + 1}
          </h3>
          <div className='the-step-bar-item-line' />
          <div className='the-step-bar-item-done-line' />
        </div>
        <div className='the-step-bar-item-content'>{node}</div>
      </a>
    )
  }
}

TheStepBar.Item = TheStepBarItem
TheStepBar.DONE_ICON = 'fas fa-check'
TheStepBar.propTypes = {
  nodes: PropTypes.array.isRequired,
  onStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
}

TheStepBar.defaultProps = {
  nodes: [],
  onStep: null,
  step: 0,
}

export default TheStepBar
