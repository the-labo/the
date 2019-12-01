'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import TheButton from '@the-/ui-button/shim/TheButton'
import TheButtonGroup from '@the-/ui-button/shim/TheButtonGroup'
import TheCondition from '@the-/ui-condition/shim/TheCondition'
import TheSpin from '@the-/ui-spin/shim/TheSpin'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'

/**
 * Steps for the-component
 */
class TheStep extends React.Component {
  constructor(props) {
    super(props)
    this.onBack = () => this.moveStep(-1)
    this.onNext = () => this.moveStep(1)
    this.contentWraps = []
    this.state = {
      contentHeight: 'auto',
    }
    this.resizeTimer = -1
  }

  componentDidMount() {
    this.resize(this.props.step)
    this.resizeTimer = setInterval(() => this.resize(this.props.step), 300)
  }

  componentDidUpdate(prevProps) {
    const {
      props: { step },
    } = this
    const updateStage = prevProps.step !== step
    if (updateStage) {
      this.resize(step)
    }
  }

  componentWillUnmount() {
    clearInterval(this.resizeTimer)
  }

  getStepCount() {
    const {
      props: { children, stepCount = children.length },
    } = this
    return stepCount
  }

  moveStep(amount) {
    const {
      props: { onStep, step },
    } = this
    const stepCount = this.getStepCount()
    const newStep = Math.min(stepCount - 1, Math.max(step + amount, 0))
    onStep(newStep)
  }

  render() {
    const stepCount = this.getStepCount()
    const step = Number(this.props.step)
    const {
      props,
      props: {
        backText = 'Back',
        children,
        className,
        hasBack = step > 0,
        hasNext = step < stepCount - 1,
        hideActions = false,
        isSubmit = step === stepCount - 1,
        nextText = 'Next',
        onSubmit,
        primaryOnSubmit = true,
        spinning,
        submitText = nextText,
      },
    } = this

    return (
      <div
        {...htmlAttributesFor(props, { except: ['className'] })}
        {...eventHandlersFor(props, { except: [] })}
        aria-busy={spinning}
        className={c('the-step', className)}
        data-step={step}
      >
        <TheSpin className='the-step-spin' cover enabled={spinning} />
        <div
          className='the-step-scroll'
          style={{ height: this.state.contentHeight }}
        >
          <div
            className='the-step-inner'
            style={{
              left: `${100 * step * -1}%`,
              width: `${100 * stepCount}%`,
            }}
          >
            {React.Children.map(children, (child, i) => (
              <div
                aria-hidden={step !== i}
                className={c('the-step-content-wrap', {
                  'the-step-content-wrap-active': step === i,
                })}
                key={i}
                ref={(contentWrap) => {
                  this.contentWraps[i] = contentWrap
                }}
                role='tabpanel'
                style={{ width: `${(100 / stepCount).toFixed(4)}%` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <TheCondition unless={hideActions}>
          <TheButtonGroup className='the-step-action'>
            <TheButton
              className={c('the-step-button', 'the-step-back-button', {
                'the-step-button-hidden': !hasBack,
              })}
              icon={TheStep.BACK_ICON}
              onClick={this.onBack}
            >
              {backText}
            </TheButton>
            <TheButton
              className={c('the-step-button', {
                'the-step-button-hidden': !hasNext && !isSubmit,
                'the-step-next-button': !isSubmit,
                'the-step-submit-button': isSubmit,
              })}
              iconRight={isSubmit ? null : TheStep.NEXT_ICON}
              onClick={isSubmit ? onSubmit : this.onNext}
              primary={isSubmit && primaryOnSubmit}
              wide
            >
              {isSubmit ? submitText : nextText}
            </TheButton>
          </TheButtonGroup>
        </TheCondition>
      </div>
    )
  }

  resize(step) {
    const contentWrap = this.contentWraps[step]
    const contentHeight = contentWrap && contentWrap.offsetHeight
    const needsUpdateState =
      contentHeight && contentHeight !== this.state.contentHeight
    if (needsUpdateState) {
      this.setState({ contentHeight })
    }
  }
}

TheStep.Content = function TheStepContent({
  children,
  className,
  spinning = false,
}) {
  return (
    <div className={c('the-step-content', className)}>
      <TheSpin className='the-step-spin' cover enabled={spinning} />
      {children}
    </div>
  )
}

TheStep.BACK_ICON = 'fas fa-caret-left'
TheStep.NEXT_ICON = 'fas fa-caret-right'

TheStep.propTypes = {
  backText: PropTypes.string,
  nextText: PropTypes.string,
  onStep: PropTypes.func.isRequired,
  spinning: PropTypes.bool,
  step: PropTypes.number.isRequired,
  submitText: PropTypes.string,
}

TheStep.defaultProps = {
  backText: 'Back',
  nextText: 'Next',
  onStep: null,
  spinning: false,
  step: 0,
}

TheStep.displayName = 'TheStep'

export default TheStep
