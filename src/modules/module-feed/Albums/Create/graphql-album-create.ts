import { gql } from '@apollo/client';

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
