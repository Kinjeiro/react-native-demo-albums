import { gql } from '@apollo/client';

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
export function getQueryAlbumsByUserKey(userId: string) {
  return {
    query: QUERY_ALBUMS_BY_USER,
    variables: {
      userId,
      page: 1,
      limit: 15,
    },
  };
}

export const MUTATION_ALBUM_REMOVE = gql`  
    mutation removeAlbum($albumId: ID!) {
        deleteAlbum(id: $albumId)
    } 
`;
