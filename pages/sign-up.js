import React from 'react';
import AppTheme from '../components/AppTheme';
import SignUp from '../components/SignUp';

export default function Page() {
  return (
    <AppTheme title="Meetup & Birra" description="Una Meetup con mucha Birra">
      <SignUp />
    </AppTheme>
  );
}
