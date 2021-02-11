import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { gql, useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';

// todo @ANKU @LOW - ошибка при использовани лоадера
// Unable to resolve module path from react-native-demo-albums\node_modules\graphql.macro\lib\utils\expandImports.js: path could not be found within the project.
// import { loader } from 'graphql.macro';
// // todo @ANKU @CRIT @MAIN - перевести на webpack loader - graphql-tag/loader
// const queryAlbumsByUser = loader('./query-albums-by-user.graphql');

import Loading from '../../../../components/Loading/Loading';
import ListWithSwypes, { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';

import FeedScreens from '../../feed-navigation';
import AlbumListItem from './AlbumListItem';



type AlbumsProps = {
  navigation: StackNavigationProp<any>;
};
const QUERY_ALBUMS_BY_USER = gql`
    query selectAlbumsByUser($userId: ID!) {
        user(id: $userId) {
            id
            albums(options: { paginate: { page: 0, limit: 3 } }) {
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
  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут
  const { data, loading } = useQuery(QUERY_ALBUMS_BY_USER, { variables: { userId: '1' } });

  const goToView = () => navigation.navigate(FeedScreens.ALBUM_VIEW);
  const goToCreate = () => navigation.navigate(FeedScreens.ALBUM_CREATE);

  const handleClickRow: ListWithSwypesCallback<any> = async ({ item: { id, title } }) =>
    navigation.navigate(FeedScreens.ALBUM_VIEW, {
      albumId: id,
      albumTitle: title,
    });
  const handleDeleteRow: ListWithSwypesCallback<any> = async (rowData) => {
    // todo @ANKU @CRIT @MAIN -
    console.warn('ANKU , delete', rowData);
  };


  return (
    <View>
      <Text>Albums</Text>
      <Button title="Go to AlbumCreate" onPress={ goToView } />
      <Button title="Go to AlbumView" onPress={ goToCreate } />

      {
        (loading || !data) ? (
          <Loading />
        ) : (
          <ListWithSwypes
            data={ data.user.albums.data }
            renderItem={ AlbumListItem }
            onClickRow={ handleClickRow }
            onDeleteRow={ handleDeleteRow }
          />
        )
      }
    </View>
  );
}
