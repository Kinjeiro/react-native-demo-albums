import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ListRenderItemInfo, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { gql, useQuery } from '@apollo/client';
import { Button, Text } from 'react-native-paper';

// todo @ANKU @LOW - ошибка при использовани лоадера
// Unable to resolve module path from react-native-demo-albums\node_modules\graphql.macro\lib\utils\expandImports.js: path could not be found within the project.
// import { loader } from 'graphql.macro';
// // todo @ANKU @CRIT @MAIN - перевести на webpack loader - graphql-tag/loader
// const queryAlbumsByUser = loader('./query-albums-by-user.graphql');

import Loading from '../../../../components/Loading/Loading';
import ListWithSwypes, { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';
import useLoadMore from '../../../../hooks/use-load-more';
import AppButton from '../../../../components-overriden/AppButton/AppButton';

// ======================================================
// MODULE
// ======================================================
import FeedScreens from '../../feed-navigation';
import AlbumListItem from './AlbumListItem';

interface AlbumsProps {
  navigation: StackNavigationProp<any>
}
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
      // todo @ANKU @LOW - динамически получать пользователя
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

  const handleCreateAlbum = () =>
    navigation.navigate(FeedScreens.ALBUM_CREATE);

  const handleClickRow: ListWithSwypesCallback<any> = async ({ item: { id, title } }) =>
    navigation.navigate(FeedScreens.ALBUM_VIEW, {
      albumId: id,
      albumTitle: title,
    });
  const handleDeleteRow: ListWithSwypesCallback<any> = async (rowData) => {
    // todo @ANKU @CRIT @MAIN -
    console.warn('ANKU , delete', rowData);
  };

  const handleRefresh = () => {
    // todo @ANKU @CRIT @MAIN - разобраться
    debugger;
    gqlResponse.refetch();
  };

  // ======================================================
  // RENDERS
  // ======================================================
  const renderHeader = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          paddingLeft: 33,
          paddingRight: 33,
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <AppButton
          onPress={ handleCreateAlbum }
        >
          Add album
        </AppButton>
      </View>
    );
  };
  const renderFooter = () => {
    return loading
      ? (
        <ActivityIndicator />
      )
      : null;
  };

  const renderItem = (rowData: ListRenderItemInfo<any>) => {
    return (
      <AlbumListItem rowData={ rowData } />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}
    >
      {
        !records ? (
          <Loading />
        ) : (
          <ListWithSwypes
            data={ records }
            renderItem={ renderItem }

            onClickRow={ handleClickRow }
            onDeleteRow={ handleDeleteRow }

            /// / Item Key
            // keyExtractor={ (item, index) => String(index) }
            // Header (Title)
            ListHeaderComponent={ renderHeader }
            // Footer (Activity Indicator)
            ListFooterComponent={ renderFooter }

            // On End Reached (Takes a function)
            onEndReached={ onLoadMore }
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={ 0.5 }
            refreshing={ gqlResponse.networkStatus === 4 }
            onRefresh={ handleRefresh }
            /// / Refreshing (Set To True When End Reached)
            // refreshing={ refreshing }
          />
        )
      }
    </View>
  );
}
