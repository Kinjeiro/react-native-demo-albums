import React from 'react';
import {
  ActivityIndicator, FlatList, ListRenderItemInfo, View
} from 'react-native';
import { gql } from '@apollo/client';

import Loading from '../../../components/Loading/Loading';
import useLoadMore from '../../../hooks/use-load-more';

// ======================================================
// MODULE
// ======================================================
import PostListItem from './PostListItem';
import { useTheme } from 'react-native-paper';

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
                    user {
                        name
                    }
                }
            }
        }
    }
`;

export default function Posts() {
  const { colors } = useTheme();

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

  const renderItem = (rowData: ListRenderItemInfo<any>) => {
    return (
      <PostListItem rowData={ rowData } />
    );
  };

  return (
    <View>
      {
        !records ? (
          <Loading />
        ) : (
          <FlatList
            data={ records }
            renderItem={ renderItem }

            style={{
              backgroundColor: colors.background,
            }}

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
