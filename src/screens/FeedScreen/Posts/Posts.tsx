import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import Loading from '../../../components/Loading/Loading';

// ======================================================
// MODULE
// ======================================================
import PostListItem from './PostListItem';
import ListWithSwypes from '../../../components/ListWithSwypes/ListWithSwypes';
import useLoadMore from '../../../hooks/use-load-more';

// todo @ANKU @LOW - paging
const QUERY_POSTS_BY_USER = gql`
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
                }
            }
        }
    }
`;

export default function Posts() {
  const {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore,
  } = useLoadMore(
    QUERY_POSTS_BY_USER,
    {
      userId: '1',
    },
    (data) => data && data.user.posts,
    (prev, next) => ({
      ...prev,
      // Concatenate the new feed results after the old ones
      user: {
        ...prev.user,
        posts: {
          ...prev.user.posts,
          data: prev.user.posts.data.concat(next.user.posts.data),
        },
      },
    }),
  );

  const renderFooter = () => {
    return loading
      ? (
        <ActivityIndicator />
      )
      : null;
  };

  return (
    <View>
      <Text>FeedPostsSubScreen</Text>

      {
        !records ? (
          <Loading />
        ) : (
          <FlatList
            data={ records }
            renderItem={ PostListItem }

            ListFooterComponent={ renderFooter }
            onEndReached={ onLoadMore }
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={ 0.5 }
            refreshing={ gqlResponse.networkStatus === 4 }
          />
        )
      }
    </View>
  );
}
