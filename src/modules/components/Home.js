/* eslint-disable import/order */
import withRoot from '../../onepirate/modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppFooter from '../../onepirate/modules/views/AppFooter';
import AppAppBar from '../../onepirate/modules/views/AppAppBar';
import ProductHero from '../../onepirate/modules/views/ProductHero';
import ProductCategories from '../../onepirate/modules/views/ProductCategories';

import { getAllMeetups } from '../../utils/api';

function Index() {
  const [meetups, setMeetup] = React.useState();
  
  React.useEffect(() => {
    if (!meetups) {
      getAllMeetups().then((meetups) => {
        setMeetup(meetups);
      });
    }
  }, [meetups]);
  

  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductCategories meetups={meetups}/>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
