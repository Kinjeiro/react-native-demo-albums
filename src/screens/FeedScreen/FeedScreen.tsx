import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AlbumsScreen from './Albums/AlbumsScreen';
import AlbumViewScreen from './Albums/AlbumViewScreen';
import AlbumCreateScreen from './Albums/AlbumCreateScreen';
import Posts from './Posts/Posts';
import FeedScreens from './feed-navigation';
import { COLOR_HEADER_BG } from '../../styles/colors';

const FeedTabs = createMaterialTopTabNavigator();

const FeedNavigator = createStackNavigator();

function FeedTabsScreen() {
  return (
    <FeedTabs.Navigator>
      <FeedTabs.Screen name="AlbumsTab" component={ AlbumsScreen } />
      <FeedTabs.Screen name="PostsTab" component={ Posts } />
    </FeedTabs.Navigator>
  );
}

export default function FeedScreen() {
  return (
    <FeedNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_HEADER_BG },
      }}
    >
      <FeedNavigator.Screen
        name={ FeedScreens.FEED }
        component={ FeedTabsScreen }
        options={{ title: 'Feed' }}
      />
      <FeedNavigator.Screen name={ FeedScreens.ALBUM_VIEW } component={ AlbumViewScreen } />
      <FeedNavigator.Screen name={ FeedScreens.ALBUM_CREATE } component={ AlbumCreateScreen } />
    </FeedNavigator.Navigator>
  );
}
