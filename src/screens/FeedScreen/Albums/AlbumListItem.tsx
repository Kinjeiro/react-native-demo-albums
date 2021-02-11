import React from 'react';
import { ListRenderItemInfo, Text, View } from 'react-native';

export default function AlbumListItem(itemInfo: ListRenderItemInfo<any>) {
  const {
    item: {
      title,
    },
  } = itemInfo;

  return (
    <Text>{ title }</Text>
  );
}
