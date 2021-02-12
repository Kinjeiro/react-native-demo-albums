import React from 'react';

import AppGraphQLProvider from './feats/feat-graphql/AppGraphQLProvider';
import AppThemeProvider from './feats/feat-theme/AppThemeProvider';
import RootNavigation from './RootNavigation';

export default function App() {
  return (
    <AppGraphQLProvider>
      <AppThemeProvider>
        <RootNavigation />
      </AppThemeProvider>
    </AppGraphQLProvider>
  );
}
