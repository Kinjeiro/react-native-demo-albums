import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import UserContext from './context-user';
import { QUERY_LOAD_USER, QueryLoadUserType, QueryLoadUserVariablesType } from './graphql-user';

export default function UserProvider({ children }: React.PropsWithChildren<any>) {
  const { loading, data } = useQuery<QueryLoadUserType, QueryLoadUserVariablesType>(
    QUERY_LOAD_USER,
    {
      variables: {
        // todo @ANKU @CRIT @MAIN @debugger - зашиваем пользователя, пока нету логин страницы
        userId: '1',
      },
    },
  );

  const userInfo = useMemo(() => ({
    user: data?.user,
    loading,
  }), [loading, data?.user]);

  return (
    <UserContext.Provider value={ userInfo }>
      { children }
    </UserContext.Provider>
  );
}
