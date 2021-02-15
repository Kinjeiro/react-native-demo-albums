import React, { useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';
import { CarouselProps } from 'react-native-snap-carousel';

import Loading from '../../../../components/Loading/Loading';
import { GQLPhoto } from '../../../../feats/feat-graphql/graphqlTypes';

// ======================================================
// MODULE
// ======================================================
import FeedScreens, { FeedScreensParamList } from '../../feed-navigation';
import Slider from './PhotoSlider/Slider';
import { QUERY_ALBUM_BY_ID, QueryAlbumByIdVariablesType, QueryAlbumByIdType } from './grapql-album-view';
import SliderEntryPhoto from './SliderEntryPhoto';


export type AlbumViewScreenProps = {
  route: RouteProp<FeedScreensParamList, FeedScreens.ALBUM_VIEW>;
  navigation: StackNavigationProp<FeedScreensParamList, FeedScreens.ALBUM_VIEW>;
};
export default function AlbumViewScreen(props: AlbumViewScreenProps) {
  const {
    route: {
      params: {
        albumId,
      },
    },
  } = props;

  const { data, loading } = useQuery<QueryAlbumByIdType, QueryAlbumByIdVariablesType>(
    QUERY_ALBUM_BY_ID,
    { variables: { albumId } },
  );
  const photos = data?.album.photos?.data;

  const renderItemWithParallax : CarouselProps<GQLPhoto>['renderItem'] = useCallback((item, parallaxProps) => {
    return (
      <SliderEntryPhoto
        data={ item.item }
        parallax={ true }
        parallaxProps={ parallaxProps }
      />
    );
  }, []);

  return (
    (loading || !photos) ? (
      <Loading />
    ) : (
      <Slider
        data={ photos }
        renderItem={ renderItemWithParallax }
      />
    )
  );
}

// const styles = StyleSheet.create({
//  image: {
//    //backgroundColor: 'blue',
//    height: 50,
//    // width: Dimensions.get('window').width,
//    width: 50,
//    //alignSelf: 'stretch',
//    resizeMode: 'contain',
//  },
// });
