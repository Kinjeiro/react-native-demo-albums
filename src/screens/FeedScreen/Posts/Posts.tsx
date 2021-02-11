import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import Loading from '../../../components/Loading/Loading';

// ======================================================
// MODULE
// ======================================================
import PostListItem from './PostListItem';

// todo @ANKU @LOW - paging
const QUERY_POSTS_BY_USER = gql`
    query selectPostsByUser($userId: ID!) {
        user(id: $userId) {
            id
            posts(options: { paginate: { page: 0, limit: 3 } }) {
                data {
                    id
                    title
                    body
                }
            }
        }
    }
`;

export default function Posts() {
  const { data, loading } = useQuery(QUERY_POSTS_BY_USER, { variables: { userId: '1' } });

  return (
    <View>
      <Text>FeedPostsSubScreen</Text>

      {
        loading ? (
          <Loading />
        ) : (
          <FlatList
            data={ data.user.posts.data }
            renderItem={ PostListItem }
          />
        )
      }
    </View>
  );
}
