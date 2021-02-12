import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native-paper';

// ======================================================
// MODULE
// ======================================================
import FAQ_DATA, { getBlockById } from './faq-data';
import FAQScreens, { FAQNavigatorParamList } from './faq-navigation';

// https://reactnavigation.org/docs/navigation-prop/
const FAQNavigator = createStackNavigator<FAQNavigatorParamList>();

interface FAQBlocksProps {
  // route: RouteProp<FAQNavigatorParamList, 'FAQBlocks'>;
  navigation: StackNavigationProp<FAQNavigatorParamList, FAQScreens.FAQ_BlocksBLOCKS>;
}
function FAQBlocks({ navigation }: FAQBlocksProps) {
  return (
    <View>
      <Text>FAQBlocks</Text>

      <FlatList
        data={ FAQ_DATA }
        renderItem={ ({ item: { id, blockTitle } }) => (
          <TouchableOpacity
            key={ id }
            style={{ paddingHorizontal: 10, marginTop: 5 }}
            onPress={ () => {
              navigation.navigate(FAQScreens.FAQ_BLOCK, {
                blockId: id,
                blockTitle,
              });
            } }
          >
            <Text>{ blockTitle }</Text>
          </TouchableOpacity>
        ) }
      />
    </View>
  );
}


interface FAQBlockProps {
  route: RouteProp<FAQNavigatorParamList, FAQScreens.FAQ_BLOCK>;
  // navigation: StackNavigationProp<FAQNavigatorParamList, 'FAQBlock'>;
}
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
        options={ ({ route }: FAQBlockProps) => ({ title: route.params.blockTitle }) }
      />
    </FAQNavigator.Navigator>
  );
}
