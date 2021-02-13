import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';

//import assetsSvgs from '../../../assets/svgs/arrow-right.svg';
import FONT_SIZES from '../../feats/feat-theme/configs/font-sizes.config';

// ======================================================
// MODULE
// ======================================================
import FAQScreens, { FAQNavigatorParamList } from './faq-navigation';
import FAQ_DATA from './faq-data';

interface FAQBlocksProps {
  // route: RouteProp<FAQNavigatorParamList, 'FAQBlocks'>;
  navigation: StackNavigationProp<FAQNavigatorParamList, FAQScreens.FAQ_BlocksBLOCKS>;
}
export default function FAQBlocksScreen({ navigation }: FAQBlocksProps) {
  const { colors } = useTheme();

  return (
    <FlatList
      data={ FAQ_DATA }
      style={{
        backgroundColor: colors.background,
      }}

      renderItem={ ({ item: { id, blockTitle } }) => (
        <TouchableOpacity
          key={ id }
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',

            height: 64,
            marginHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 20,

            borderBottomColor: colors.listItemDelimiter,
            borderBottomWidth: 1,
          }}
          onPress={ () => {
            navigation.navigate(FAQScreens.FAQ_BLOCK, {
              blockId: id,
              blockTitle,
            });
          } }
        >
          <Text style={{ fontSize: FONT_SIZES.faqTitle }}>
            { blockTitle }
          </Text>
          <Text>
            {/*// todo @ANKU @LOW - иконка стрелки вправо */}
            {'>'}
          </Text>
        </TouchableOpacity>
      ) }
    />
  );
}
