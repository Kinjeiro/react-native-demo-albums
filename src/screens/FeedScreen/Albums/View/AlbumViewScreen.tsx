import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { gql, useQuery } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Loading from '../../../../components/Loading/Loading';

// ======================================================
// MODULE
// ======================================================
import FeedScreens, { FeedScreensParamList } from '../../feed-navigation';
import CommonStyles from '../../../../styles/common-styles';
import { viewportWidth } from '../../../../styles/dimensions';
import Slider from './Slider/Slider';

const QUERY_ALBUM_BY_ID = gql`
    query queryAlbumById($albumId: ID!) {
        album(id: $albumId) {
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
`;


// const renderItem = ({ item, index }) => {
//  const {
//    id,
//    title,
//    url,
//    thumbnailUrl,
//  } = item;
//
//  return (
//    <View
//      key={ url }
//      style={ [
//        {
//          backgroundColor: 'aqua',
//          flex: 1,
//          flexDirection: 'column',
//          alignItems: 'center',
//          justifyContent: 'center',
//
//          borderRadius: 5,
//          height: 250,
//          // padding: 50,
//          // marginLeft: 25,
//          // marginRight: 25,
//        },
//      ] }
//    >
//      <Text style={{ }}>
//        TEST
//      </Text>
//      <View style={ [
//        CommonStyles.imageContainer,
//        {
//          width: viewportWidth,
//          height: 100,
//        },
//      ] }
//      >
//        <Image
//          source={{ uri: thumbnailUrl }}
//          style={ CommonStyles.image }
//          // resizeMode="contain"
//        />
//      </View>
//      <Text style={{ fontSize: 30 }}>
//        {title}
//      </Text>
//    </View>
//  );
// };

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

  // const [activeSlide, setActiveSlide] = useState(0);

  const { data, loading } = useQuery(QUERY_ALBUM_BY_ID, { variables: { albumId } });

  // renderItem(item: { item: T; index: number }, parallaxProps?: AdditionalParallaxProps): React.ReactNode;

  return (
    loading ? (
      <Loading />
    ) : (
      <Slider
        data={ data.album.photos.data }
      />
    )
  );

  // return (
  //  <View
  //    style={{
  //      flex: 1,
  //    }}
  //  >
  //    {
  //      loading ? (
  //        <Loading />
  //      ) : (
  //        <SafeAreaView
  //          style={{
  //            flex: 1,
  //            // backgroundColor: 'yellow',
  //            // paddingTop: 50,
  //            // alignItems: 'center',
  //            // justifyContent: 'center',
  //          }}
  //        >
  //          <View
  //            style={{
  //              flex: 1,
  //              flexDirection: 'column',
  //              // alignItems: 'center',
  //              // justifyContent: 'center',
  //              // backgroundColor: 'green',
  //              // height: 100,
  //            }}
  //          >
  //            <Carousel
  //              layout="default"
  //              data={ data.album.photos.data }
  //              sliderWidth={ viewportWidth }
  //              itemWidth={ viewportWidth }
  //              renderItem={ renderItem }
  //              onSnapToItem={ setActiveSlide }
  //            />
  //            <Pagination
  //              dotsLength={ data.album.photos.data.length }
  //              activeDotIndex={ activeSlide }
  //              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
  //              dotStyle={{
  //                width: 10,
  //                height: 10,
  //                borderRadius: 5,
  //                marginHorizontal: 8,
  //                backgroundColor: 'rgba(255, 255, 255, 0.92)',
  //              }}
  //              inactiveDotStyle={{
  //                // Define styles for inactive dots here
  //              }}
  //              inactiveDotOpacity={ 0.4 }
  //              inactiveDotScale={ 0.6 }
  //            />
  //          </View>
  //        </SafeAreaView>
  //      )
  //    }
  //  </View>
  // );
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
