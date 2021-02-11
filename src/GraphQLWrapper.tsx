import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const cache = new InMemoryCache();

const client = new ApolloClient({
  // todo @ANKU @CRIT @MAIN - вынести в конфиги
  // uri: 'https://api.graphql.guide/graphql',
  uri: 'https://graphqlzero.almansi.me/api',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

export default function GraphQLWrapper({ children }: React.PropsWithChildren<any>) {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  );
}
