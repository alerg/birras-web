/* eslint-disable import/order */
import withRoot from '../withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppFooter from './AppFooter';
import AppAppBar from './AppAppBar';
import ProductHero from './ProductHero';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
