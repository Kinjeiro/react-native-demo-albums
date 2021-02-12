import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, IconButton } from 'react-native-paper';

import FeedPage from './modules/module-feed/FeedPage';
import FAQPage from './modules/module-faq/FAQPage';
import UserProfilePage from './modules/module-profile/UserProfilePage';

import RootScreens from './root-navigation';


const FooterTabs = createMaterialBottomTabNavigator();

export default function RootNavigation() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <FooterTabs.Navigator
        initialRouteName={ RootScreens.FEED }
        // unmountOnBlur={ true }
        // todo @ANKU @LOW - вынести цвета
        activeColor={ colors.primary }
        inactiveColor={ colors.disabled }
        barStyle={{ backgroundColor: colors.background }}
        screenOptions={{
          tabBarLabel: '',
        }}
      >
        <FooterTabs.Screen
          name={ RootScreens.FEED }
          component={ FeedPage }
          options={{
            tabBarIcon: ({ color }) => (
              <IconButton icon="camera" color={ color } />
            ),
          }}
        />
        <FooterTabs.Screen
          name={ RootScreens.FAQ }
          component={ FAQPage }
          options={{
            tabBarIcon: ({ color }) => (
              <IconButton icon="camera" color={ color } />
            ),
          }}
        />
        <FooterTabs.Screen
          name={ RootScreens.PROFILE }
          component={ UserProfilePage }
          options={{
            tabBarIcon: ({ color }) => (
              <IconButton icon="camera" color={ color } />
            ),
          }}
        />
      </FooterTabs.Navigator>
    </NavigationContainer>
  );
}
