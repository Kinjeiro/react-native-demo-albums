import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './screens/FeedScreen/FeedScreen';
import FAQScreen from './screens/FAQScreen/FAQScree';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { COLOR_FOOTER_TABS_BG } from './styles/colors';
import RootScreens from './root-navigation';

const FooterTabs = createMaterialBottomTabNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <FooterTabs.Navigator
        initialRouteName={ RootScreens.FEED }
        // unmountOnBlur={ true }
        // todo @ANKU @LOW - вынести цвета
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: COLOR_FOOTER_TABS_BG }}
      >
        <FooterTabs.Screen name={ RootScreens.FEED } component={ FeedScreen } />
        <FooterTabs.Screen name={ RootScreens.FAQ } component={ FAQScreen } />
        <FooterTabs.Screen name={ RootScreens.PROFILE } component={ ProfileScreen } />
      </FooterTabs.Navigator>
    </NavigationContainer>
  );
}
