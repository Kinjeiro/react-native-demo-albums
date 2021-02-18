import { gql } from '@apollo/client';
import { Cache } from '@apollo/client/cache/core/types/Cache';

import { GQLAlbumsPage } from '../../../../feats/feat-graphql/graphqlTypes';
import { DEFAULT_LIMIT } from '../../../../hooks/use-load-more';


export const QUERY_ALBUMS = gql`
    query selectAlbums($page: Int, $limit: Int) {
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
`;
export type QueryAlbumsType = {
  albums: GQLAlbumsPage,
};
export type QueryAlbumsByUserVariablesType = {
  page: number,
  limit: number,
};
export function getQueryAlbumsKey()
: Cache.ReadQueryOptions<QueryAlbumsType, QueryAlbumsByUserVariablesType> {
  return {
    //propTypes,
    query: QUERY_ALBUMS,
    variables: {
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
