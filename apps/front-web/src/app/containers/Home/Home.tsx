import * as React from 'react';
import { BannerFragment } from './fragments/BannerFragment';
import { ListFragment } from './fragments/ListFragment';
import { WorksFragment } from './fragments/WorksFragment';
import HeatMap from '../../components/Heatmap/Heatmap';

export const Home = () => {
  return (
    <React.Fragment>
      <HeatMap
        heatmapData={[
          [51.505, -0.09, 0.5],
          [51.51, -0.09, 0.5],
        ]}
      />
      <BannerFragment />
      <ListFragment />
      <WorksFragment />
    </React.Fragment>
  );
};
