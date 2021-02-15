import { gql } from '@apollo/client';
import { Cache } from '@apollo/client/cache/core/types/Cache';

import { GQLUser } from '../../../../feats/feat-graphql/graphqlTypes';
import { DEFAULT_LIMIT } from '../../../../hooks/use-load-more';


export const QUERY_ALBUMS_BY_USER = gql`
    query selectAlbumsByUser($userId: ID!, $page: Int, $limit: Int) {
        user(id: $userId) {
            id
            albums(options: { paginate: { page: $page, limit: $limit } }) {
                meta {
                    totalCount
                }
                data {
                    id
                    title
                    user {
                        name
                    }
                    photos(options: { paginate: { page: 1, limit: 1 } }) {
                        data {
                            id
                            title
                            url
                            thumbnailUrl
                        }
                    }
                }
            }
        }
    }
`;
export type QueryAlbumsByUserType = {
  user: GQLUser,
};
export type QueryAlbumsByUserVariablesType = {
  userId: string,
  page: number,
  limit: number,
};
export function getQueryAlbumsByUserKey(userId: string)
  : Cache.ReadQueryOptions<QueryAlbumsByUserType, QueryAlbumsByUserVariablesType> {
  return {
    //propTypes,
    query: QUERY_ALBUMS_BY_USER,
    variables: {
      userId,
      page: 1,
      limit: DEFAULT_LIMIT,
    },
  };
}

export const MUTATION_ALBUM_REMOVE = gql`  
    mutation removeAlbum($albumId: ID!) {
        deleteAlbum(id: $albumId)
    } 
`;
export type MutationAlbumRemoveType = {
  deleteAlbum: boolean,
};
