import * as React from 'react';
import { BannerFragment } from './fragments/BannerFragment';
import { ListFragment } from './fragments/ListFragment';
import { WorksFragment } from './fragments/WorksFragment';
import { Heatmap } from './HeatMap/Heatmap';

export const Home = () => {
  return (
    <React.Fragment>
      <Heatmap />
      <BannerFragment />
      <ListFragment />
      <WorksFragment />
    </React.Fragment>
  );
};
