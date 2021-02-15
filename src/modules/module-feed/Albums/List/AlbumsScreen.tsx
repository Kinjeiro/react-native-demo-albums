import React, { useCallback, useState } from 'react';
import {
  ListRenderItemInfo,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client';
import { useTheme } from 'react-native-paper';

// todo @ANKU @LOW - ошибка при использовани лоадера
// Unable to resolve module path from react-native-demo-albums\node_modules\graphql.macro\lib\utils\expandImports.js: path could not be found within the project.
// import { loader } from 'graphql.macro';
// // todo @ANKU @CRIT @MAIN - перевести на webpack loader - graphql-tag/loader
// const queryAlbumsByUser = loader('./query-albums-by-user.graphql');

import { setInDeepReducer } from '../../../../core-feats/feat-common-utils/common-utils';
import { IS_WEB } from '../../../../core-feats/feat-native-utils/native-utils';
import { sleep } from '../../../../core-feats/feat-common-utils/promise-utils';
import GetStyle from '../../../../core-feats/feat-native-utils/get-style-type';
import USER from '../../../../feats/feat-auth/user.data';
import useLoadMore from '../../../../hooks/use-load-more';
import Loading from '../../../../components/Loading/Loading';
import ListWithSwypes, { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';
import AppButton from '../../../../components-overriden/AppButton/AppButton';
import BottomModal from '../../../../components/BottomModal/BottomModal';


// ======================================================
// MODULE
// ======================================================
import FeedScreens from '../../feed-navigation';
import AlbumListItem from './AlbumListItem';
import DeleteDialog from './DeleteDialog';
import {
  getQueryAlbumsByUserKey,
  MUTATION_ALBUM_REMOVE,
  MutationAlbumRemoveType,
  QueryAlbumsByUserType, QueryAlbumsByUserVariablesType,
} from './graphql-albums';
import { GQLAlbum } from '../../../../feats/feat-graphql/graphqlTypes';


// todo @ANKU @LOW - в вебе падает - Note: React Native MaskedView is not currently supported by Expo unless you
// "eject". TypeError: Object(...) is not a function Module.
// \node_modules\@react-native-community\masked-view\js\MaskedView.js
// /node_modules/@react-native-community/masked-view/js/MaskedView.js:14 11 | import React from 'react'; 12 | import
// { View, StyleSheet, requireNativeComponent } from 'react-native'; 13 | > 14 | const RNCMaskedView =
// requireNativeComponent<any>('RNCMaskedView'); 15 | 16 | import { type MaskedViewProps } from './MaskedViewTypes';
const SkeletonClass = IS_WEB
  ? Loading
  : require('./AlbumItemSkeleton').default;


interface AlbumsProps {
  navigation: StackNavigationProp<any>
}
export default function AlbumsScreen({ navigation }: AlbumsProps) {
  const [deletingAlbumId, setDeletingAlbumId] = useState(null);

  const queryAlbumByUserKey = getQueryAlbumsByUserKey(USER.id);

  const {
    loading,
    records,
    totalCount,
    gqlResponse,
    onLoadMore,
  } = useLoadMore<QueryAlbumsByUserType, QueryAlbumsByUserVariablesType, GQLAlbum>(
    queryAlbumByUserKey.query,
    queryAlbumByUserKey.variables,
    (data) => data.user.albums,
    (prev, next) => setInDeepReducer<QueryAlbumsByUserType>(
      prev,
      'user.albums.data',
      prev.user.albums?.data?.concat(next.user.albums?.data || []),
    ),
  );

  const [apiRemoveAlbum] = useMutation<MutationAlbumRemoveType>(
    MUTATION_ALBUM_REMOVE,
    {
      // todo @ANKU @LOW - переместить к описанию запроса
      optimisticResponse: {
        //__typename: 'Mutation',
        deleteAlbum: true,
      },
      update: (proxy, { data }) => {
        const prevData = proxy.readQuery<QueryAlbumsByUserType>(queryAlbumByUserKey);
        if (prevData?.user.albums?.meta?.totalCount) {
          proxy.writeQuery({
            ...queryAlbumByUserKey,
            data: setInDeepReducer<any>(
              prevData,
              'user.albums',
              {
                meta: {
                  totalCount: prevData.user.albums.meta.totalCount - 1,
                },
                data: prevData.user.albums.data?.filter((album) => album && album.id !== deletingAlbumId),
              }
              ,
            ),
          });
        }
      },
    },
  );



  // todo @ANKU @LOW - динамически получать пользователя
  // todo @ANKU @LOW - сгенерировать из схемы TS интерфейсы и прописать их тут

  // const goToView = () => navigation.navigate(FeedScreens.ALBUM_VIEW);
  // const goToCreate = () => navigation.navigate(FeedScreens.ALBUM_CREATE);

  const handleCreateAlbum = useCallback(() =>
    navigation.navigate(FeedScreens.ALBUM_CREATE), []);

  const handleClickRow: ListWithSwypesCallback<any> = useCallback(async ({ item: { id, title } }) =>
    navigation.navigate(FeedScreens.ALBUM_VIEW, {
      albumId: id,
      albumTitle: title,
    }), []);
  const handleDeleteRow: ListWithSwypesCallback<any> = useCallback(async (rowData) => {
    setDeletingAlbumId(rowData.item.id);
  }, []);
  const handleConfirmedDelete = useCallback(async () => {
    await apiRemoveAlbum({ variables: { albumId: deletingAlbumId } });
    // todo @ANKU @CRIT @MAIN @debugger - для наглядности лоадинга
    await sleep(3000);
    setDeletingAlbumId(null);
  }, [deletingAlbumId, apiRemoveAlbum]);
  const handleCloseDeleteAlbumDialog = useCallback(() => setDeletingAlbumId(null), []);

  const handleRefresh = useCallback(async () => gqlResponse.refetch(), []);

  // ======================================================
  // RENDERS
  // ======================================================
  const styles = getStyles(useTheme());

  const renderHeader = useCallback(() => {
    return (
      <View style={ styles.spacingList }>
        <AppButton onPress={ handleCreateAlbum }>
          Add album
        </AppButton>
      </View>
    );
  }, [handleCreateAlbum]);
  const renderFooter = useCallback(() => {
    return loading
      ? (
        <View style={ styles.spacingList }>
          <Loading />
        </View>
      )
      : null;
  }, [loading]);

  const renderItem = useCallback((rowData: ListRenderItemInfo<any>) => {
    return (
      <AlbumListItem rowData={ rowData } />
    );
  }, []);


  const renderSkeleton = useCallback(() => {
    return (
      <SkeletonClass />
    );
  }, []);

  // ======================================================
  // MAIN RENDER
  // ======================================================
  return (
    <View style={ styles.root }>
      { /*      // <SkeletonContent
      //  containerStyle={{ flex: 1 width: 300 }}
      //  isLoading={!records}
      //  layout={[
      //    { key: 'someId', width: 220, height: 20, marginBottom: 6 },
      //    { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
      //  ]}
      //>
      //  <Text style={styles.normalText}>Your content</Text>
      //  <Text style={styles.bigText}>Other content</Text>
      //</SkeletonContent>*/ }
      {
        !records
          ? renderSkeleton()
          : (
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

      {/*<BottomDialog
        ref={ bottomSheetRef }
        renderContent={ renderContent }
      />*/}

      {
        deletingAlbumId && (
          <BottomModal onClose={ handleCloseDeleteAlbumDialog }>
            <DeleteDialog onDelete={ handleConfirmedDelete } />
          </BottomModal>
        )
      }

    </View>
  );
}

const getStyles : GetStyle = ({ spacing }) => ({
  root: {
    flex: 1,
  },
  spacingList: {
    justifyContent: 'center',
    paddingLeft: spacing.defaultMargin * 2,
    paddingRight: spacing.defaultMargin * 2,
    marginTop: spacing.defaultMargin,
    marginBottom: spacing.defaultMargin,
  },
});
