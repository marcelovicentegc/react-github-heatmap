import React, { useState, FormEventHandler } from 'react';
import { Heatmap, HeatmapData } from 'react-github-heatmap';
import ReactTooltip from 'react-tooltip';
import { format } from 'date-fns';

import 'typeface-public-sans';
import './Demo.css';

import { CodeBlock } from './CodeBlock';
import { ForkMe } from './ForkMe';

const initialState: HeatmapData = {
  years: [
    {
      year: '2020',
      total: 257,
      range: {
        start: '2020-01-01',
        end: '2020-12-31',
      },
    },
  ],
  contributions: [
    {
      date: '2019-12-13',
      count: 5,
      color: '#239a3b',
      intensity: 2,
    },
    {
      date: '2019-12-14',
      count: 10,
      color: '#239a3b',
      intensity: 3,
    },
    {
      date: '2019-12-15',
      count: 10,
      color: '#239a3b',
      intensity: 3,
    },
    {
      date: '2019-12-18',
      count: 15,
      color: '#239a3b',
      intensity: 3,
    },
    {
      date: '2019-12-19',
      count: 12,
      color: '#239a3b',
      intensity: 3,
    },
    {
      date: '2019-12-22',
      count: 1,
      color: '#239a3b',
      intensity: 1,
    },
    {
      date: '2019-12-23',
      count: 1,
      color: '#239a3b',
      intensity: 1,
    },
    {
      date: '2019-12-24',
      count: 7,
      color: '#239a3b',
      intensity: 2,
    },
  ],
};

const Demo: React.FC = () => {
  const [data] = useState<HeatmapData>(initialState);
  const input = React.createRef<HTMLInputElement>();

  const updateUsername: FormEventHandler = event => {
    event.preventDefault();
  };

  return (
    <div>
      <header>
        <ForkMe />
        <div className="container">
          <h1>react-github-heatmap</h1>
          <div>A plugable React component to display a GitHub-like contributions graph</div>
          <form onSubmit={updateUsername}>
            <input type="text" placeholder="Enter your GitHub username" ref={input} required />
            <button type="submit">Show calendar</button>
          </form>
        </div>
      </header>
      <main className="container">
        <Heatmap data={data} />

        <section>
          <h2>Installation</h2>
          <CodeBlock style={{ marginTop: '0.5rem' }}>yarn install react-github-heatmap</CodeBlock>
          <p>Then in your code:</p>
          <CodeBlock>
            {`import React from 'react';
import { Heatmap, HeatmapData } from 'react-github-heatmap';
import { api } from './api';

const App = () => {
  const [data, setData] = React.useState<HeatmapData>();
  React.useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (): Promise<HeatmapData> => {
    await api.getData().then(data => {
      setData(data);
    }).catch(error => { 
      alert(error.message)
    })
  }

  return (
    <Heatmap data={data} />
  )
}`}
          </CodeBlock>
        </section>

        <section>
          <h2>Component properties</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>data</td>
                  <td>HeatmapData</td>
                  <td>-</td>
                  <td>
                    The heatmap data (<em>required</em>)
                  </td>
                </tr>
                <tr>
                  <td>blockMargin</td>
                  <td>number</td>
                  <td>2</td>
                  <td>Margin between blocks</td>
                </tr>
                <tr>
                  <td>blockSize</td>
                  <td>number</td>
                  <td>12</td>
                  <td>Size of one block (one day)</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>
                    string|<a href="https://www.npmjs.com/package/tinycolor2">Color</a>
                  </td>
                  <td>undefined</td>
                  <td>Base color to compute graph intensity colors (see below)</td>
                </tr>
                <tr>
                  <td>dateFormat</td>
                  <td>string</td>
                  <td>'MMM d, yyyy'</td>
                  <td>
                    A{' '}
                    <code>
                      <a href="https://date-fns.org/v2.9.0/docs/format">date-fns/format</a>
                    </code>{' '}
                    compatible date string
                  </td>
                </tr>
                <tr>
                  <td>fontSize</td>
                  <td>number</td>
                  <td>14</td>
                  <td>Base font size for text in chart. The title above (@user) is 25% larger.</td>
                </tr>
                <tr>
                  <td>fullYear</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>
                    Whether to show the whole last year starting now or this year only (starting in
                    January).
                  </td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Theme</td>
                  <td>
                    <em>GitHub theme</em>
                  </td>
                  <td>A object specifying all theme colors explicitly (see below)</td>
                </tr>
                <tr>
                  <td>tooltips</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>
                    Whether to add <code>data-tip</code> attributes to the blocks. Add{' '}
                    <code>react-tooltip</code> and use it as child of this component. See below
                    example.
                  </td>
                </tr>
                <tr>
                  <td>years</td>
                  <td>number[]</td>
                  <td>[{format(new Date(), 'yyyy')}]</td>
                  <td>
                    List of to be rendered years. Defaults to the current year. If no data is
                    available the chart for this year will be ommited.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Examples</h2>

          <ol>
            <li>
              <a href="#show-contributions-of-last-year">Show contributions of last year</a>
            </li>
            <li>
              <a href="#display-this-year-only">Display this year only</a>
            </li>
            <li>
              <a href="#show-several-years">Show several years</a>
            </li>
            <li>
              <a href="#set-the-color-theme">Set the color theme</a>
            </li>
            <li>
              <a href="#add-tooltips">Add tooltips</a>
            </li>
            <li>
              <a href="#different-block-size">Different block size</a>
            </li>
            <li>
              <a href="#different-block-margin">Different block margin</a>
            </li>
            <li>
              <a href="#chart-font-size">Chart font size</a>
            </li>
          </ol>

          <hr />

          <h3 id="show-contributions-of-last-year">Show contributions of last year</h3>
          <p>By default the last whole year is shown.</p>
          <CodeBlock>{`<Heatmap data={data} />`}</CodeBlock>
          <Heatmap data={data} />

          <hr />

          <h3 id="display-this-year-only">Display this year only</h3>
          <p>
            You might prefer the calendar for the current year to start in January (instead of
            showing the last twelve months).
          </p>
          <CodeBlock>{`<Heatmap data={data} fullYear={false} />`}</CodeBlock>
          <Heatmap data={data} fullYear={false} />

          <hr />

          <h3 id="show-several-years">Show several years</h3>
          <p>To display multiple years, pass an array into the component:</p>
          <CodeBlock>{`<Heatmap data={data} years={[2018, 2017]} fullYear={false}/>`}</CodeBlock>
          <Heatmap data={data} years={[2018, 2017]} fullYear={false} />

          <hr />

          <h3 id="set-the-color-theme">Set the color theme</h3>
          <p>
            Either set a base color (any valid CSS color) to calculate the color hues for the
            contribution intensity automatically or specify the different theme colors explicitly.
            If a color is set, the theme will be ignored. If neither color or theme is set, the
            standard GitHub colors will be used (as in these examples).
          </p>
          <CodeBlock>{`<Heatmap data={data} color="hsl(203, 82%, 33%)" />`}</CodeBlock>
          <Heatmap data={data} color="hsl(203, 82%, 33%)" />
          <p>Set the colors explicitly like this:</p>
          <CodeBlock>
            {`const defaultTheme = {
  background: 'transparent',
  text: '#000',
  grade4: '#196127',
  grade3: '#239a3b',
  grade2: '#7bc96f',
  grade1: '#c6e48b',
  grade0: '#ebedf0',
};

<Heatmap data={data} theme={defaultTheme} />`}
          </CodeBlock>
          <Heatmap data={data} />

          <hr />

          <h3 id="add-tooltips">Add tooltips</h3>
          <p>
            In order to show tooltips on hover, you need to add another dependency{' '}
            <code>react-tooltip</code>. Add this component then as child of the calendar. Make sure
            to enable the `html` property in the <code>ReactTooltip</code> component to display the
            message correctly.
          </p>
          <CodeBlock>
            {`<div>
    <Heatmap data={data}>
      <ReactTooltip delayShow={50} html />
    </Heatmap>
  </div>`}
          </CodeBlock>
          <div>
            <Heatmap data={data}>
              <ReactTooltip delayShow={50} html />
            </Heatmap>
          </div>

          <hr />

          <h3 id="different-block-size">Different block size</h3>
          <p>The block size (12 per default) is configurable:</p>
          <CodeBlock>{`<Heatmap data={data} blockSize={10} />`}</CodeBlock>
          <Heatmap data={data} blockSize={10} />

          <hr />

          <h3 id="different-block-margin">Different block margin (and size)</h3>
          <p>Analogously the block margin can be adjusted.</p>
          <CodeBlock>{`<Heatmap data={data} blockSize={10} blockMargin={4} />`}</CodeBlock>
          <Heatmap data={data} blockSize={10} blockMargin={4} />

          <hr />

          <h3 id="chart-font-size">Chart font size</h3>
          <p>
            Finally, there is a property to set the fontsize of the text inside the chart. This
            comes in handy, if a large block size or margin is set. The default base font size is
            14px.
          </p>
          <CodeBlock>{`<Heatmap data={data} fontSize={14} blockSize={12} />`}</CodeBlock>
          <Heatmap data={data} fontSize={14} blockSize={12} />
        </section>
      </main>
    </div>
  );
};

export default Demo;
