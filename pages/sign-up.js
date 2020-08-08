import React from 'react';
import AppTheme from '../src/modules/components/AppTheme';
import SignUp from '../src/modules/components/SignUp';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <SignUp />
    </AppTheme>
  );
}
