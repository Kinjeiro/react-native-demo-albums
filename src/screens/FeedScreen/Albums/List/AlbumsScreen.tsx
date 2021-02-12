import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { gql, useQuery } from '@apollo/client';

// todo @ANKU @LOW - ошибка при использовани лоадера
// Unable to resolve module path from react-native-demo-albums\node_modules\graphql.macro\lib\utils\expandImports.js: path could not be found within the project.
// import { loader } from 'graphql.macro';
// // todo @ANKU @CRIT @MAIN - перевести на webpack loader - graphql-tag/loader
// const queryAlbumsByUser = loader('./query-albums-by-user.graphql');

import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../../../../components/Loading/Loading';
import ListWithSwypes, { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';

import FeedScreens from '../../feed-navigation';
import AlbumListItem from './AlbumListItem';
import useLoadMore from '../../../../hooks/use-load-more';

type AlbumsProps = {
  navigation: StackNavigationProp<any>;
};
const QUERY_ALBUMS_BY_USER = gql`
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
        }
    }
`;

/*
const [page, setPage] = React.useState(1);
  const [results, setResults] = React.useState([]);

  const LIMIT = 3;

  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const gqlResponse = useQuery(
    QUERY_ALBUMS_BY_USER,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        userId: '1',
        // todo @ANKU @CRIT @MAIN - идет двойной запрос, нужно вынести этот метод
        page,
        limit: LIMIT,
      },
    },
  );
  const {
    loading,
    data,
  } = gqlResponse;

  const totalCount = data && data.user.albums.meta.totalCount;
  // const records = data && data.user.albums.data;

  useEffect(() => {
    const newResults = [...results, ...data.user.albums.data];
    setResults(newResults);
  }, [data]);

  function onLoadMore() {
    if (results.length < totalCount) {
      setPage(Math.ceil(results.length / LIMIT) + 1);
    }
  }
*/




export default function AlbumsScreen({ navigation }: AlbumsProps) {
  const {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore,
  } = useLoadMore(
    QUERY_ALBUMS_BY_USER,
    {
      userId: '1',
    },
    (data) => data && data.user.albums,
    (prev, next) => ({
      ...prev,
      // Concatenate the new feed results after the old ones
      user: {
        ...prev.user,
        albums: {
          ...prev.user.albums,
          data: prev.user.albums.data.concat(next.user.albums.data),
        },
      },
    }),
  );

  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут

  // const goToView = () => navigation.navigate(FeedScreens.ALBUM_VIEW);
  // const goToCreate = () => navigation.navigate(FeedScreens.ALBUM_CREATE);

  const handleClickRow: ListWithSwypesCallback<any> = async ({ item: { id, title } }) =>
    navigation.navigate(FeedScreens.ALBUM_VIEW, {
      albumId: id,
      albumTitle: title,
    });
  const handleDeleteRow: ListWithSwypesCallback<any> = async (rowData) => {
    // todo @ANKU @CRIT @MAIN -
    console.warn('ANKU , delete', rowData);
  };

  const renderFooter = () => {
    return loading
      ? (
        <ActivityIndicator />
      )
      : null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        !records ? (
          <Loading />
        ) : (
          <ListWithSwypes
            data={ records }
            renderItem={ AlbumListItem }

            onClickRow={ handleClickRow }
            onDeleteRow={ handleDeleteRow }

            /// / Item Key
            // keyExtractor={ (item, index) => String(index) }
            // Header (Title)
            // ListHeaderComponent={ renderHeader }
            // Footer (Activity Indicator)
            ListFooterComponent={ renderFooter }

            // On End Reached (Takes a function)
            onEndReached={ onLoadMore }
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={ 0.5 }
            refreshing={ gqlResponse.networkStatus === 4 }
            onRefresh={ () => {
              // todo @ANKU @CRIT @MAIN - разобраться
              debugger;
              gqlResponse.refetch();
            } }
            /// / Refreshing (Set To True When End Reached)
            // refreshing={ refreshing }
          />
        )
      }
    </SafeAreaView>
  );
}
