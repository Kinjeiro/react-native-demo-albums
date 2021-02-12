import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { getSlackNavigatorScreenOptions } from '../../styles/common-styles';

// ======================================================
// MODULE
// ======================================================
import ProfileScreens from './profile-navigation';
import UserProfileScreen from './UserProfileScreen';

const UserNavigator = createStackNavigator();

export default function UserProfilePage() {
  return (
    <UserNavigator.Navigator
      screenOptions={ getSlackNavigatorScreenOptions(useTheme()) }
    >
      <UserNavigator.Screen name={ ProfileScreens.PROFILE } component={ UserProfileScreen } />
    </UserNavigator.Navigator>
  );
}
