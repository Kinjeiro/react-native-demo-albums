import React from 'react';
import {
  Image, ListRenderItemInfo, View,
} from 'react-native';
import { Title, useTheme } from 'react-native-paper';

import SmallText from '../../../../components/SmallText/SmallText';
import GetStyle from '../../../../feats/feat-utils/get-style-type';

// todo @ANKU @LOW - GQL TS

interface AlbumListItemProps {
  rowData: ListRenderItemInfo<any>,
}
function AlbumListItem({ rowData }: AlbumListItemProps) {
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
  } = rowData;

  // todo @ANKU @LOW - если не будет фотки - сделать стаб
  const { thumbnailUrl } = photos.data[0] || {};

  const styles = getStyles(useTheme());

  return (
    <View style={ styles.root }>
      <View style={ styles.imageContainer }>
        <Image
          source={{ uri: thumbnailUrl }}
          style={ styles.image }
        />
      </View>
      <View style={ styles.rightContainer }>
        <SmallText>
          {name}
        </SmallText>
        <Title style={ styles.title }>
          {title}
          {' '}
          (
          {id}
          )
        </Title>
      </View>
    </View>
  );
}

export default React.memo(AlbumListItem);

const getStyles : GetStyle = ({ colors }) => ({
  root: {
    flex: 1,
    height: 128,
    //backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,

    // не получится использовать так как там бэкграунт нужен чтобы прикрыть экшены
    //box-shadow: inset 0px -1px 0px #F2F2F2;
    //shadowColor: colors.listItemShadow,
    //shadowOffset: {
    //  width: 0,
    //  height: 3,
    //},
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    borderBottomColor: colors.listItemShadow,
    borderBottomWidth: 3,
  },
  imageContainer: {
    borderRadius: 5,
    justifyContent: 'center',
  },
  image: {
    height: 96,
    // width: Dimensions.get('window').width,
    width: 96,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  rightContainer: {
    flex: 1,
    height: 96,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  title: {
    marginTop: 8,
  },
});
