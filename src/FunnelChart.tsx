import * as React from 'react'
import './index.css'

interface IFunnelChartProps {
  data: any
  title?: string
  showValues: boolean
  showNames: boolean
  pallette: string[]
  showRunningTotal: boolean
  heightRelativeToValue: boolean
  chartHeight?: number
  chartWidth?: number
  style?: React.CSSProperties
  funnelShape?: 'standard' | 'flat'
  getRowStyle?: (row: any) => React.CSSProperties
  getRowNameStyle?: (row: any) => React.CSSProperties
  getRowValueStyle?: (row: any) => React.CSSProperties
  getTitleStyle?: (title: any) => React.CSSProperties
  decorateValue?: (row: any, index: number, data: any) => any
  getToolTip?: (row: any) => string
  onRowClick?: (row: any) => void
}

interface IFunnelChartState {}

const initialState: IFunnelChartState = {}

class FunnelChart extends React.Component<
  IFunnelChartProps,
  IFunnelChartState
> {
  static defaultProps = {
    showValues: true,
    showNames: true,
    pallette: [
      '#f14c14',
      '#f39c35',
      '#68BC00',
      '#1d7b63',
      '#4e97a8',
      '#4466a3'
    ],
    showRunningTotal: false,
    heightRelativeToValue: false,
    funnelShape: 'standard'
  }

  constructor(props: IFunnelChartProps) {
    super(props)
    this.state = initialState
  }

  setFunnelRows() {
    const {
      data,
      showNames,
      showValues,
      showRunningTotal,
      heightRelativeToValue,
      chartHeight,
      getRowStyle,
      getRowNameStyle,
      getRowValueStyle,
      decorateValue,
      getToolTip,
      onRowClick
    } = this.props
    const rows = []
    const totalValue = this.getTotalValue()

    let sizePerValue = 0
    if (heightRelativeToValue && totalValue > 0) {
      let totalHeight = chartHeight
      if (!totalHeight) {
        totalHeight = 500
        if (window.innerWidth < 500) {
          totalHeight = 300
        }
      }
      sizePerValue = totalHeight / totalValue
    }

    var runningTotal = totalValue
    if (data) {
      for (var i1 = 0; i1 < data.length; i1++) {
        const thisRow = data[i1]
        let showTitle = true
        let showValue = true

        if (thisRow.value >= 0) {
          let rowStyle: React.CSSProperties = {}
          let rowTitleStyle: React.CSSProperties = {}
          let rowValueStyle: React.CSSProperties = {}
          const decoratedValue =
            typeof decorateValue === 'function'
              ? decorateValue(thisRow, i1, data)
              : thisRow.value

          if (typeof getRowStyle === 'function') {
            rowStyle = getRowStyle(thisRow)
          }
          if (typeof getRowNameStyle === 'function') {
            rowTitleStyle = getRowNameStyle(thisRow)
          }
          if (typeof getRowValueStyle === 'function') {
            rowValueStyle = getRowValueStyle(thisRow)
          }

          if (heightRelativeToValue) {
            const size = sizePerValue * thisRow.value
            rowStyle.height = size + 'px'
            rowStyle.maxHeight = size + 'px'
            if (size < 65) {
              showValue = false
            }
            if (size < 40) {
              showTitle = false
            }
          }
          if (thisRow.backgroundColor) {
            rowStyle.backgroundColor = thisRow.backgroundColor
          }
          if (!rowStyle.backgroundColor) {
            rowStyle.backgroundColor =
              this.props.pallette[i1 % this.props.pallette.length]
          }

          if (!showNames) {
            showTitle = false
          }
          if (!showValues) {
            showValue = false
          }

          let toolTip = thisRow.name + '\n' + runningTotal
          if (typeof getToolTip === 'function') {
            toolTip = getToolTip(thisRow)
          }

          if (typeof onRowClick === 'function') {
            rowStyle.cursor = 'pointer'
          }

          rows.push(
            <div
              key={'funnel-pipeline-chart-row-' + thisRow.name}
              className='funnel-pipeline-chart-row'
              style={rowStyle}
              title={toolTip}
              onClick={
                typeof onRowClick === 'function'
                  ? () => onRowClick(thisRow)
                  : undefined
              }
            >
              <div>
                {showTitle ? (
                  <div
                    className='funnel-pipeline-chart-title'
                    style={rowTitleStyle}
                  >
                    {thisRow.name}
                  </div>
                ) : null}
                {showValue ? (
                  <div
                    className='funnel-pipeline-chart-value'
                    style={rowValueStyle}
                  >
                    {showRunningTotal ? runningTotal : decoratedValue}
                  </div>
                ) : null}
              </div>
            </div>
          )
        }

        runningTotal = runningTotal - thisRow.value
      }
    }

    return rows
  }

  getTotalValue() {
    const { data } = this.props

    let dataTotal = 0
    if (data) {
      for (var i1 = 0; i1 < data.length; i1++) {
        dataTotal += data[i1].value
      }
    }

    return dataTotal
  }

  render() {
    const { title, style, funnelShape, getTitleStyle } = this.props

    let titleStyle: React.CSSProperties = { marginBottom: '30px' }

    if (typeof getTitleStyle === 'function') {
      titleStyle = getTitleStyle(title)
    }

    const funnelShapeClassName =
      funnelShape === 'flat'
        ? 'funnel-pipeline-chart-flat'
        : 'funnel-pipeline-chart'

    const chartStyles: React.CSSProperties = {}
    if (style) {
      Object.assign(chartStyles, style)
    }
    if (this.props.chartWidth) {
      chartStyles.maxWidth = this.props.chartWidth
    }

    return (
      <div className={funnelShapeClassName} style={chartStyles}>
        {title ? <h2 style={titleStyle}>{title}</h2> : null}
        {this.setFunnelRows()}
      </div>
    )
  }
}

export default FunnelChart
