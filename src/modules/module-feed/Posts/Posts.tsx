import React from 'react';
import {
  ActivityIndicator, FlatList, ListRenderItemInfo, View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import USER from '../../../feats/feat-auth/user.data';
import Loading from '../../../components/Loading/Loading';
import useLoadMore from '../../../hooks/use-load-more';

// ======================================================
// MODULE
// ======================================================
import PostListItem from './PostListItem';
import { QueryPostsByUserType, QueryPostsByUserVariablesType, getQueryPostsByUserKey } from './graphql-posts';
import { GQLPost } from '../../../feats/feat-graphql/graphqlTypes';

export default function Posts() {
  const { colors } = useTheme();

  const queryKey = getQueryPostsByUserKey(USER.id);

  const {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore,
  } = useLoadMore<QueryPostsByUserType, QueryPostsByUserVariablesType, GQLPost>(
    queryKey.query,
    queryKey.variables,
    (data) => data && data.user.posts,
    (prev, next) => ({
      ...prev,
      // Concatenate the new feed results after the old ones
      user: {
        ...prev.user,
        posts: {
          ...prev.user.posts,
          data: prev.user.posts?.data?.concat(next.user.posts?.data || []),
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
