import * as React from 'react';
import { BannerFragment } from './fragments/BannerFragment';
import { ListFragment } from './fragments/ListFragment';
import { Heatmap } from './HeatMap/Heatmap';

export const Home = () => {
  return (
    <React.Fragment>
      <BannerFragment />
      <Heatmap />
      <ListFragment />
    </React.Fragment>
  );
};
