import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// ======================================================
// MODULE
// ======================================================
import FAQScreens, { FAQNavigatorParamList } from './faq-navigation';
import FAQBlockScreen, { FAQBlockScreenProps } from './FAQBlockScreen';
import FAQBlocksScreen from './FAQBlocksScreen';
import { getSlackNavigatorScreenOptions } from '../../styles/common-styles';
import { useTheme } from 'react-native-paper';

// https://reactnavigation.org/docs/navigation-prop/
const FAQNavigator = createStackNavigator<FAQNavigatorParamList>();

export default function FAQPage() {
  return (
    <FAQNavigator.Navigator
      screenOptions={ getSlackNavigatorScreenOptions(useTheme()) }
    >
      <FAQNavigator.Screen
        name={ FAQScreens.FAQ_BlocksBLOCKS }
        component={ FAQBlocksScreen }
        options={{ title: 'FAQ' }}
      />

      <FAQNavigator.Screen
        name={ FAQScreens.FAQ_BLOCK }
        component={ FAQBlockScreen }
        options={ ({ route }: FAQBlockScreenProps) => ({ title: route.params.blockTitle }) }
      />
    </FAQNavigator.Navigator>
  );
}
