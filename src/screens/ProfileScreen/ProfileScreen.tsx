import { Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreens from './profile-navigation';

const UserNavigator = createStackNavigator();

function UserProfile() {
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <UserNavigator.Navigator>
      <UserNavigator.Screen name={ ProfileScreens.PROFILE } component={ UserProfile } />
    </UserNavigator.Navigator>
  );
}
