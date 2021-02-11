import React from 'react';
import {
  Image, StyleSheet, Text, View, 
} from 'react-native';

import { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';

// todo @ANKU @LOW - GQL TS
const AlbumListItem:ListWithSwypesCallback<any> = (itemInfo) => {
  const {
    item: {
      title,
      photos,
    },
  } = itemInfo;

  // todo @ANKU @LOW - если не будет фотки
  const { thumbnailUrl } = photos.data[0] || {};

  return (
    <View>
      <Text>{ title }</Text>
      <Image source={ thumbnailUrl } style={ styles.image } />
    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    height: 50,
    // width: Dimensions.get('window').width,
    width: 50,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});



export default AlbumListItem;
