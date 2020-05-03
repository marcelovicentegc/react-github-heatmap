# react-github-heatmap

[![npm version](https://badge.fury.io/js/%40react-github-heatmap.svg)](https://www.npmjs.com/package/react-github-heatmap)

A plugable React component to display a GitHub-like contributions graph based on SVG.

## 📦 Install

`npm i react-github-heatmap`

`yarn add react-github-heatmap`

## 🔨 Usage

Take a glance at the [docs](https://underworld-industries.github.io/react-github-heatmap) to see
further examples 😉.

```typescript
import React from 'react';
import { Heatmap, HeatmapData } from 'react-github-heatmap';
import { api } from './api';

const App = () => {
  const [data, setData] = React.useState<HeatmapData>();
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await api
      .getData()
      .then(data => {
        setData(data);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return <Heatmap data={data} />;
};
```

## 🚧 Development directions

1. Clone this repo: `git clone git@github.com:underworld-industries/react-github-heatmap.git`
2. Install dependencies: `yarn`
3. Build the app: `yarn build`
4. Change directory into `example` and install its dependencies: `cd example && yarn`
5. From inside the `example` folder, start the app: `yarn start`
