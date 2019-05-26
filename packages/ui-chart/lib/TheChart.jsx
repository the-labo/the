'use strict'

import Chart from 'chart.js'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from '@the-/util-ui'
import TheChartStyle from './TheChartStyle'

/**
 * Chart for the-components
 */
class TheChart extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.chart = null
  }

  componentDidMount() {
    const {
      props: { data, onChat, options, type },
      canvasRef: { current: canvas },
    } = this
    const chart = (this.chart = new Chart(canvas, {
      data,
      options,
      type,
    }))
    onChat && onChat(chart)
  }

  componentDidUpdate(prevProps) {
    const { chart, props } = this
    const { data, options } = props
    chart.data = data
    chart.options = options
    chart.update()
  }

  render() {
    const { props } = this
    const { className, height, width } = props
    return (
      <div
        {...htmlAttributesFor(props, { except: ['className', 'data'] })}
        {...eventHandlersFor(props, { except: [] })}
        className={c('the-chart', className)}
      >
        <canvas
          className='the-chart-canvas'
          height={height}
          ref={this.canvasRef}
          width={width}
        />
      </div>
    )
  }
}

TheChart.Style = TheChartStyle

TheChart.propTypes = {
  /** Chart type */
  /** Chart data */
  data: PropTypes.object,
  /** Get ref to chart */
  onChart: PropTypes.func,
  /** Chart options */
  options: PropTypes.object,
  type: PropTypes.oneOf([
    'bar',
    'doughnut',
    'line',
    'pie',
    'polarArea',
    'radar',
  ]).isRequired,
}

TheChart.defaultProps = {
  data: {},
  height: 300,
  onChart: null,
  options: {},
  width: 300,
}

TheChart.displayName = 'TheChart'

export default TheChart
