import * as React from 'react';
import { BannerFragment,  } from './fragments/BannerFragment';
import { ListFragment } from './fragments/ListFragment';
import { WorksFragment } from './fragments/WorksFragment';


export const Home = () => {

    return (
        <React.Fragment>
            <BannerFragment />
            <ListFragment />
            <WorksFragment />
        </React.Fragment>
    )
}
