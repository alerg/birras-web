import React from 'react';
import AppTheme from '../components/AppTheme';
import SignIn from '../components/SignIn';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <SignIn />
    </AppTheme>
  );
}
