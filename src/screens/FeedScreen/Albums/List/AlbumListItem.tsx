import React from 'react';
import {
  Image, StyleSheet, View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { ListWithSwypesCallback } from '../../../../components/ListWithSwypes/ListWithSwypes';

// todo @ANKU @LOW - GQL TS
const AlbumListItem:ListWithSwypesCallback<any> = (itemInfo) => {
  const {
    item: {
      id,
      title,
      user: {
        name,
      },
      photos,
    },
    index,
  } = itemInfo;

  // todo @ANKU @LOW - если не будет фотки - сделать стаб
  const { thumbnailUrl } = photos.data[0] || {};

  return (
    <View
      style={{
        flex: 1,
        height: 128,
        //backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri: thumbnailUrl }}
          style={{
            height: 96,
            // width: Dimensions.get('window').width,
            width: 96,
            alignSelf: 'stretch',
            resizeMode: 'cover',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 96,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginLeft: 16,
        }}
      >
        <Text
          style={{
            fontSize: 10,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginTop: 8,
          }}
        >
          {title} ({id})
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    height: 96,
    // width: Dimensions.get('window').width,
    width: 96,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});



export default AlbumListItem;
