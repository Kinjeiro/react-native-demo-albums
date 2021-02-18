import React from 'react';

import { GQLUser } from '../feat-graphql/graphqlTypes';

export type UserInfo = {
  user?: GQLUser,
  loading: boolean,
};

export const UserInfoInitial : UserInfo = {
  user: undefined,
  loading: false,
};

const UserContext = React.createContext<UserInfo>(UserInfoInitial);

export default UserContext;
