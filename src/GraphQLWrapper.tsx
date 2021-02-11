import React, { useEffect, useState } from 'react';
import {
  ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache,
} from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

// todo @ANKU @CRIT @MAIN - вынести в конфиги
const httpLink = new HttpLink({ uri: 'https://graphqlzero.almansi.me/api' });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        project: {
          merge: true,
          // merge(existing, incoming) {
          //  return incoming;
          // },
        },
      },
    },
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  // operation.setContext(({ headers = {} }) => ({
  //  headers: {
  //    ...headers,
  //    authorization: localStorage.getItem('token') || null,
  //  },
  // }));
  return forward(operation);
});

const client = new ApolloClient({
  // uri: 'https://api.graphql.guide/graphql',
  // uri: 'https://graphqlzero.almansi.me/api',
  link: concat(authMiddleware, httpLink),

  // todo @ANKU @LOW - Cache data may be lost when replacing the user field of a Query object.
  cache,

  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
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
