import React from 'react';

import GraphQlWrapper from './GraphQLWrapper';
import RootNavigation from './RootNavigation';

export default function App() {
  return (
    <GraphQlWrapper>
      <RootNavigation />
    </GraphQlWrapper>
  );
}
