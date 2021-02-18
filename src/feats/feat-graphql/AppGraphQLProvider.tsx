import React, { useEffect, useState } from 'react';
import {
  ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache,
} from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import GRAPHQL_CONFIG from './config';

const httpLink = new HttpLink({ uri: GRAPHQL_CONFIG.endpointUri });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // todo @ANKU @LOW - использовать новые полиси
        //project: {
        //  merge: true,
        //  // merge(existing, incoming) {
        //  //  return incoming;
        //  // },
        //},
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

export default function AppGraphQLProvider({ children }: React.PropsWithChildren<any>) {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  //const [loadingCache, setLoadingCache] = useState(false);


  if (loadingCache) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={ client }>
      { children }
    </ApolloProvider>
  );
}
