import React from 'react';
import AppTheme from './../src/components/AppTheme';
import Home from './../src/components/Home';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <Home />
    </AppTheme>
  );
}
