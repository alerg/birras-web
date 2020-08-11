import React from 'react';
import AppTheme from '../components/AppTheme';
import Home from '../components/Home';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <Home />
    </AppTheme>
  );
}
