import React, { useState } from 'react';
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


type AlbumsProps = {
  navigation: StackNavigationProp<any>;
};
const QUERY_ALBUMS_BY_USER = gql`
    query selectAlbumsByUser($userId: ID!, $page: Int, $limit: Int) {
        user(id: $userId) {
            id
            albums(options: { paginate: { page: $page, limit: $limit } }) {
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

export default function AlbumsScreen({ navigation }: AlbumsProps) {
  const [isAll, setIsAll] = useState(false);

  const LIMIT = 3;

  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const gqlResponse = useQuery(
    QUERY_ALBUMS_BY_USER,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        userId: '1',
        page: 1,
        limit: LIMIT,
      },
    },
  );
  const {
    loading,
    data,
  } = gqlResponse;

  const records = data && data.user.albums.data;

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
        !data ? (
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
            onEndReached={ () => {
              // todo @ANKU @CRIT @MAIN - сделать по нормальному через cursor
              if (!isAll) {
                // todo @ANKU @CRIT @MAIN - идет несколько запросов
                gqlResponse.fetchMore({
                  variables: {
                    page: Math.ceil(records.length / LIMIT) + 1,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (fetchMoreResult.user.albums.data.length < LIMIT) {
                      setIsAll(true);
                    }

                    // Don't do anything if there weren't any new items
                    if (!fetchMoreResult || fetchMoreResult.user.albums.data.length === 0) {
                      return previousResult;
                    }

                    return {
                      ...previousResult,
                      // Concatenate the new feed results after the old ones
                      user: {
                        ...previousResult.user,
                        albums: {
                          ...previousResult.albums,
                          data: previousResult.user.albums.data.concat(fetchMoreResult.user.albums.data),
                        },
                      },
                    };
                  },
                });
              }
            } }
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
