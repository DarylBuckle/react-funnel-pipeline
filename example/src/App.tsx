import React, { useState } from 'react'
import data from './data'
import 'bootstrap/dist/css/bootstrap.css'

import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'

const App = () => {
  const [optionShowName, setOptionShowName] = useState(true)
  const [optionShowValue, setOptionShowValue] = useState(true)
  const [optionShowRunning, setOptionShowRunning] = useState(true)
  const [optionShowTitle, setOptionShowTitle] = useState(true)
  const [chartHeight, setChartHeight] = useState('500')

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary fixed-top'>
          <div style={{width:'100%'}}>
              <ul className='navbar-nav ml-lg-5'>
                  <li className='nav-item mr-lg-3'>
                      <a className={'nav-link active'} href='.'>Examples</a>
                  </li>
                  <li className='nav-item mr-lg-3'>
                      <a className={'nav-link'} href='http://github.com/darylbuckle/react-funnel-pipeline'>Documentation</a>
                  </li>
              </ul>
          </div>
      </nav>

      <div className='container' style={{marginTop:'100px'}}>
        <h1 className='mb-5'>react funnel pipeline examples</h1>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Basic Funnel</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                A basic out-the-box react-funnel-pipeline without any customization.
                <br /><br />
                Only the "data" prop is set. "data" must be an array of objects containing at least "name" (string) and "value" (number) attributes. In this case it is;
              </p>
              <pre>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Funnel Options</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                Some options that you can enable/disable.
              </p>
              <div>
                <div><input type='checkbox' checked={optionShowName} onChange={() => setOptionShowName(!optionShowName)}></input><label>Show Row Names</label></div>
                <div><input type='checkbox' checked={optionShowValue} onChange={() => setOptionShowValue(!optionShowValue)}></input><label>Show Row Values</label></div>
                <div><input type='checkbox' checked={optionShowRunning} onChange={() => setOptionShowRunning(!optionShowRunning)}></input><label>Show Running Total</label></div>
                <div><input type='checkbox' checked={optionShowTitle} onChange={() => setOptionShowTitle(!optionShowTitle)}></input><label>Show Chart Title</label></div>
              </div>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
                showNames={optionShowName}
                showValues={optionShowValue}
                showRunningTotal={optionShowRunning}
                title={optionShowTitle ? 'This is the title' : undefined}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Colours and Styles</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                Parse "pallette" (array of hex colour strings) to change the colours used. Each row in "data" can have a backgroundColor attribute to set the colour for that row.
                <br/><br/>
                The "style" prop can be used to parse additional styles to the chart.
                <br/><br/>
                The "getRowStyle", "getRowNameStyle" and "getRowValueStyle" props are functions which can be used to customise the style of particular rows.
              </p>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
                pallette={[
                  '#ffb3ba',
                  '#ffdfba',
                  '#ffffba',
                  '#baffc9',
                  '#bae1ff',
                ]}
                getRowStyle={() => { return { margin: '0px'} }}
                getRowNameStyle={(row) => { return row.value < 15 ? { color: 'red'} : { color: 'black'}}}
                getRowValueStyle={(row) => { return row.value < 15 ? { color: 'red'} : { color: 'black'}}}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Events</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                Use "onRowClick" to act on a particular row being clicked.
                <br/><br/>
                The selected row will be parsed as a parameter.
                <br/><br/>
                Click a row on this example to see for yourself.
              </p>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
                onRowClick={(row) => { window.alert('You clicked on ' + row.name)}}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Relative Height</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                When "heightRelativeToValue" is true, each row/segment has it's height relative to it's value.
                <br/><br/>
                The chart must be a fixed height when this setting is active. The "chartHeight" prop can be customised.
              </p>
              <div>
                <div><label>Height: </label><input type='number' value={chartHeight} onChange={(e) => setChartHeight(e.target.value)}></input></div>
              </div>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
                heightRelativeToValue={true}
                chartHeight={!isNaN(Number(chartHeight)) ? parseInt(chartHeight) : undefined}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 mb-5'>
          <h2 className='mb-4'>Additional Customisation</h2>
          <div className='row'>
            <div className='col-md-6'>
              <p>
                This example uses "getToolTip" to change the title for each row/segment.
                <br/><br/>
                Hover over a row/segment of this example to see it in action.
              </p>
            </div>
            <div className='col-md-6'>
              <FunnelChart 
                data={data}
                getToolTip={(row) => { return 'This is a custom tooltip for ' + row.name}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
