import React from 'react';

import AppGraphQLProvider from './feats/feat-graphql/AppGraphQLProvider';
import PortalsProvider from './feats/feat-portals/PortalsProvider';
import AppThemeProvider from './feats/feat-theme/AppThemeProvider';
import UserProvider from './feats/feat-auth/UserProvider';

import RootNavigation from './RootNavigation';

export default function App() {
  return (
    <AppGraphQLProvider>
      <UserProvider>
        <AppThemeProvider>
          <PortalsProvider>
            <RootNavigation />
          </PortalsProvider>
        </AppThemeProvider>
      </UserProvider>
    </AppGraphQLProvider>
  );
}
