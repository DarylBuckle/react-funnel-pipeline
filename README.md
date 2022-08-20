# react-funnel-pipeline

> A lightweight component for rendering a basic funnel chart.

[![NPM](https://img.shields.io/npm/v/react-funnel-pipeline.svg)](https://www.npmjs.com/package/react-funnel-pipeline) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![react-funnel-pipeline](./funnel.png)

## Contents

* [Install](#install)
* [Usage](#usage)
* [Props](#props)
* [License](#license)

<br/>


## Install

```bash
npm install --save react-funnel-pipeline
```

Peer Dependencies;
* React v16 +

## Usage

```tsx
import React, { Component } from 'react'

import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'

class Example extends Component {
  render() {
    return (
      <FunnelChart 
        data={[
          { name: 'Awareness', value: 252 },
          { name: 'Interest', value: 105 },
          { name: 'Consideration', value: 84 },
          { name: 'Evaluation', value: 72 },
          { name: 'Commitment', value: 19 },
          { name: 'Pre-sale', value: 0 },
          { name: 'Sale', value: 10 }
        ]}
      />
    )
  }
}
```

See the [Examples](./example) for more info and advanced usage.

Build the Examples with `npm install` and then `npm start` to start the development server at [http://localhost:3000](http://localhost:3000).

Or view the online examples at [https://darylbuckle.github.io/react-funnel-pipeline](https://darylbuckle.github.io/react-funnel-pipeline).


## Props

| Property | Type | Default | Mandatory | Description |
| -------- |------| --------| ----------| ------------|
|    data | object[]  |  | true | The data to display in the Funnel Chart. Must be an array of objects that contain a minimum of 'name' (string) and 'value' (number). |
|    title | string  |  | false | Displays a title above the funnel chart. |
|    showValues | boolean  | true | false | Whether to show the value within the chart segment. |
|    showNames | boolean  | true | false | Whether to show the name of the segment within the chart segment. |
|    showRunningTotal | boolean  | false | false | When this is true instead of showing the value in the segment it will show the running total of all values underneath it. |
|    pallette | string[]  | ['#f14c14', '#f39c35', '#68BC00', '#1d7b63', '#4e97a8', '#4466a3'] | false | A list of hexadecimal colours as strings to use for the background colour of chart segments. |
|    chartWidth | number  |  | false | The maximum width of the chart. |
|    chartHeight | number  | 500 | false | This is only used when 'heightRelativeToValue' is true. The height of the chart. |
|    heightRelativeToValue | boolean  | false | false | When true each segment will have it's height relative to the value. IE segments with higher values will appear larger than those with smaller values. |
|    style | style object  | | false | A JSX style object to override styles for the chart. |
|    getRowStyle | func(row)  |  | false | A function which parses row data. Return a JSX style object to override styles for that row. |
|    getRowNameStyle | func(row)  |  | false | A function which parses row data. Return a JSX style object to override styles for that rows name. |
|    getRowValueStyle | func(row)  |  | false | A function which parses row data. Return a JSX style object to override styles for that rows value. |
|    decorateValue | func(row, index, array)  |  | false | A function which decorates the value when rendering the row value. Return an object to override the value displayed on the row. The unaltered value is used in all other calculations. |
|    getToolTip | func(row)  |  | false | A function which parses row data. Return a string to override the tooltip for that row. |
|    onRowClick | func(row)  |  | false | Called when a row/segment is clicked. Parses the data of the row which was clicked on. |


<br/>


## License

MIT © [DarylBuckle](https://github.com/DarylBuckle) 2020
