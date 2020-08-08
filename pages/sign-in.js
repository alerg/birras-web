import React from 'react';
import AppTheme from '../src/modules/components/AppTheme';
import SignIn from '../src/modules/components/SignIn';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <SignIn />
    </AppTheme>
  );
}
