import { gql } from '@apollo/client';
import { Cache } from '@apollo/client/cache/core/types/Cache';

import { GQLUser } from '../../../feats/feat-graphql/graphqlTypes';
import { DEFAULT_LIMIT } from '../../../hooks/use-load-more';

export const QUERY_POSTS_BY_USER = gql`
    query selectPostsByUser($userId: ID!, $page: Int, $limit: Int) {
        user(id: $userId) {
            id
            posts(options: { paginate: { page: $page, limit: $limit } }) {
                meta {
                    totalCount
                }
                data {
                    id
                    title
                    body
                    user {
                        name
                    }
                }
            }
        }
    }
`;

export type QueryPostsByUserType = {
  user: GQLUser,
};
export type QueryPostsByUserVariablesType = {
  userId: string,
  page: number,
  limit: number,
};
export function getQueryPostsByUserKey(userId: string)
  : Cache.ReadQueryOptions<QueryPostsByUserType, QueryPostsByUserVariablesType> {
  return {
    //propTypes,
    query: QUERY_POSTS_BY_USER,
    variables: {
      userId,
      page: 1,
      limit: DEFAULT_LIMIT,
    },
  };
}
