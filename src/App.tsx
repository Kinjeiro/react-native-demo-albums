import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './screens/FeedScreen/FeedScreen';
import FAQScreen from './screens/FAQScreen/FAQScree';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const FooterTabs = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <FooterTabs.Navigator
        initialRouteName="Feed"
        // unmountOnBlur={ true }
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <FooterTabs.Screen name="Feed" component={ FeedScreen } />
        <FooterTabs.Screen name="FAQ" component={ FAQScreen } />
        <FooterTabs.Screen name="User" component={ ProfileScreen } />
      </FooterTabs.Navigator>
    </NavigationContainer>
  );
}
