import { gql } from '@apollo/client';
import { Cache } from '@apollo/client/cache/core/types/Cache';

import { GQLPostsPage } from '../../../feats/feat-graphql/graphqlTypes';
import { DEFAULT_LIMIT } from '../../../hooks/use-load-more';

export const QUERY_POSTS = gql`
    query selectPosts($page: Int, $limit: Int) {
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
`;

export type QueryPostsType = {
  posts: GQLPostsPage;
};
export type QueryPostsVariablesType = {
  page: number,
  limit: number,
};

export function getQueryPostsKey()
: Cache.ReadQueryOptions<QueryPostsType, QueryPostsVariablesType> {
  return {
    //propTypes,
    query: QUERY_POSTS,
    variables: {
      page: 1,
      limit: DEFAULT_LIMIT,
    },
  };
}
