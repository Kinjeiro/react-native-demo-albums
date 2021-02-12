import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';

import SmallText from '../../../components/SmallText/SmallText';

interface PostListItemProps {
  rowData: ListRenderItemInfo<any>,
}
function PostListItem({ rowData }: PostListItemProps) {
  const {
    item: {
      title,
      body,
      user: {
        name,
      },
    },
  } = rowData;

  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 16,
        paddingBottom: 16,

        backgroundColor: colors.background,

        // не получится использовать так как там бэкграунт нужен чтобы прикрыть экшены
        //box-shadow: inset 0px -1px 0px #F2F2F2;
        //shadowColor: colors.listItemShadow,
        //shadowOffset: {
        //  width: 0,
        //  height: 3,
        //},
        //shadowOpacity: 0.25,
        //shadowRadius: 3.84,
        borderBottomColor: colors.listItemDelimiter,
        borderBottomWidth: 1,
      }}
    >
      <SmallText style={{ textTransform: 'uppercase' }}>{ name }</SmallText>
      <Title>{ title }</Title>
      <SmallText>{ body }</SmallText>
    </View>
  );
}

export default React.memo(PostListItem);
