import React from 'react';
import { ListRenderItemInfo, Text, View } from 'react-native';

// todo @ANKU @LOW - сделать тип записей
export default function PostListItem(itemInfo: ListRenderItemInfo<any>) {
  const {
    item: {
      title,
      body,
    },
  } = itemInfo;

  return (
    <View>
      <Text>{ title }</Text>
      <Text>{ body }</Text>
    </View>
  );
}
