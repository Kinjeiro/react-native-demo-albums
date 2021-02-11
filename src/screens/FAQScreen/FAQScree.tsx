import React from 'react';
import {
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import FAQ_DATA, { getBlockById, getBlockName } from './faq-data';
import FAQScreens from './faq-navigation';

/*
 initialRouteName,
  children,
  screenOptions
 */
type FAQNavigatorParamList = {
  [FAQScreens.FAQ_BlocksBLOCKS]: undefined;
  [FAQScreens.FAQ_BLOCK]: { blockId: string };
};
// https://reactnavigation.org/docs/navigation-prop/
const FAQNavigator = createStackNavigator<FAQNavigatorParamList>();

type FAQBlocksProps = {
  // route: RouteProp<FAQNavigatorParamList, 'FAQBlocks'>;
  navigation: StackNavigationProp<FAQNavigatorParamList, FAQScreens.FAQ_BlocksBLOCKS>;
};
function FAQBlocks({ navigation }: FAQBlocksProps) {
  return (
    <View>
      <Text>FAQBlocks</Text>

      <FlatList
        data={ FAQ_DATA }
        renderItem={ ({ item }) => (
          <TouchableOpacity
            key={ item.id }
            style={{ paddingHorizontal: 10, marginTop: 5 }}
            onPress={ () => {
              navigation.navigate(FAQScreens.FAQ_BLOCK, { blockId: item.id });
            } }
          >
            <Text>{ item.block }</Text>
          </TouchableOpacity>
        ) }
      />
    </View>
  );
}


type FAQBlockProps = {
  route: RouteProp<FAQNavigatorParamList, FAQScreens.FAQ_BLOCK>;
  // navigation: StackNavigationProp<FAQNavigatorParamList, 'FAQBlock'>;
};
function FAQBlock({ route: { params } }: FAQBlockProps) {
  const { blockId } = params;

  const blockFaq = getBlockById(blockId);
  // navigation.setOptions({title: blockFaq ? blockFaq.block : ''})

  return (
    <View>
      <Text>
        FAQBlock -
        {blockId}
      </Text>
      {
        blockFaq && (
          <FlatList
            data={ blockFaq.faq }
            renderItem={ ({ item }) => (
              <Text key={ item.id }>{ item.question }</Text>
            ) }
          />
        )
      }
    </View>
  );
}

export default function FAQScreen() {
  return (
    <FAQNavigator.Navigator>
      <FAQNavigator.Screen name={ FAQScreens.FAQ_BlocksBLOCKS } component={ FAQBlocks } />
      <FAQNavigator.Screen
        name={ FAQScreens.FAQ_BLOCK }
        component={ FAQBlock }
        options={ ({ route }: FAQBlockProps) => ({ title: getBlockName(route.params.blockId) }) }
      />
    </FAQNavigator.Navigator>
  );
}
