import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator, FlatList, ListRenderItemInfo, View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import Loading from '../../../components/Loading/Loading';
import useLoadMore from '../../../hooks/use-load-more';

// ======================================================
// MODULE
// ======================================================
import PostListItem from './PostListItem';
import { QueryPostsType, QueryPostsVariablesType, getQueryPostsKey } from './graphql-posts';
import { GQLPost } from '../../../feats/feat-graphql/graphqlTypes';
import { setInDeepReducer } from '../../../core-feats/feat-common-utils/common-utils';
import GetStyle from '../../../core-feats/feat-native-utils/get-style-type';

export default function Posts() {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const queryKey = useMemo(getQueryPostsKey, []);

  const {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore,
  } = useLoadMore<QueryPostsType, QueryPostsVariablesType, GQLPost>(
    queryKey.query,
    queryKey.variables,
    (data) => data && data.posts,
    (prev, next) => setInDeepReducer<QueryPostsType>(
      prev,
      'posts.data',
      prev.posts.data?.concat(next.posts.data || []),
    ),
  );

  const renderFooter = useCallback(() => {
    return loading
      ? (
        <Loading style={ styles.footer } />
      )
      : null;
  }, [loading]);

  const renderItem = useCallback((rowData: ListRenderItemInfo<any>) => {
    return (
      <PostListItem
        key={ rowData.item.id }
        rowData={ rowData }
      />
    );
  }, []);

  return (
    <View style={ styles.root }>
      {
        !records ? (
          <Loading />
        ) : (
          <FlatList
            data={ records }
            renderItem={ renderItem }

            style={ styles.list }

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

const getStyles : GetStyle = ({ spacing, colors }) => ({
  root: {
    flex: 1,
  },
  list: {
    backgroundColor: colors.background,
  },
  footer: {
    marginTop: spacing.defaultMargin,
    marginBottom: spacing.defaultMargin,
  },
});

