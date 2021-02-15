import { gql } from '@apollo/client';
import { GQLAlbum } from '../../../../feats/feat-graphql/graphqlTypes';

export const QUERY_ALBUM_BY_ID = gql`
    query queryAlbumById($albumId: ID!) {
        album(id: $albumId) {
            id
            title
            photos {
                data {
                    id
                    title
                    url
                    thumbnailUrl
                }
            }
        }
    }
`;

export type QueryAlbumByIdType = {
  album: GQLAlbum,
};
export type QueryAlbumByIdVariablesType = {
  albumId: string,
};
