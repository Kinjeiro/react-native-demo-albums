import { RouteProp } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

// ======================================================
// MODULE
// ======================================================
import FAQScreens, { FAQNavigatorParamList } from './faq-navigation';
import { getBlockById } from './faq-data';
import FONT_SIZES from '../../feats/feat-theme/font-size.config';


export interface FAQBlockScreenProps {
  route: RouteProp<FAQNavigatorParamList, FAQScreens.FAQ_BLOCK>;
  navigation: StackNavigationProp<FAQNavigatorParamList, FAQScreens.FAQ_BLOCK>;
}
export default function FAQBlockScreen({ route: { params } }: FAQBlockScreenProps) {
  const { blockId } = params;

  const { colors } = useTheme();

  const blockFaq = getBlockById(blockId);
  // navigation.setOptions({title: blockFaq ? blockFaq.block : ''})

  if (!blockFaq) {
    return null;
  }

  return (
    <List.Section>
      {
        blockFaq.faq.map(({ id, question, answer }) => (
          <List.Accordion
            key={ id }
            title={ question }
            titleStyle={{
              fontSize: FONT_SIZES.faqTitle,
              color: colors.text,
            }}
          >
            <List.Item
              title={ answer }
              titleStyle={{
                fontSize: FONT_SIZES.faqTitle,
                color: colors.disabled,
              }}
              titleNumberOfLines={ 20 }
              style={{
                // todo @ANKU @LOW - маржин для бордера сделать
                //marginHorizontal: 16,
                paddingBottom: 20,
                borderBottomColor: colors.listItemDelimiter,
                borderBottomWidth: 1,
              }}
            />
          </List.Accordion>
        ))
      }
    </List.Section>
  );
}
