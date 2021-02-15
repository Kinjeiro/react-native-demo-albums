import { gql } from '@apollo/client';
import { GQLAlbum } from '../../../../feats/feat-graphql/graphqlTypes';
import { CreateAlbumInput } from '../../../../feats/feat-graphql/graphqlTypesAdditional';

export const MUTATION_ALBUM_CREATE = gql`
    mutation creteAlbum($albumInputData: CreateAlbumInput!) {
        createAlbum(input: $albumInputData) {
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
`;
export type MutationAlbumCreateType = {
  createAlbum: GQLAlbum,
};
export type MutationAlbumCreateVariablesType = {
  albumInputData: CreateAlbumInput,
};
